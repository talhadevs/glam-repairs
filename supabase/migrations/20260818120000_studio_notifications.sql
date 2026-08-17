-- In-app notifications for owner and staff, with live updates.

create table if not exists public.studio_notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.studio_members (user_id) on delete cascade,
  actor_id uuid references auth.users (id) on delete set null,
  type text not null check (
    type in (
      'chat_message',
      'review_submitted',
      'payment_verified',
      'customer_assigned'
    )
  ),
  title text not null,
  body text not null,
  href text not null,
  lead_id uuid references public.leads (id) on delete cascade,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists studio_notifications_recipient_created_at_idx
  on public.studio_notifications (recipient_id, created_at desc);

create index if not exists studio_notifications_recipient_unread_idx
  on public.studio_notifications (recipient_id)
  where read_at is null;

create or replace function private.insert_studio_notification(
  p_recipient_id uuid,
  p_actor_id uuid,
  p_type text,
  p_title text,
  p_body text,
  p_href text,
  p_lead_id uuid default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if p_recipient_id is null then
    return;
  end if;

  if p_actor_id is not null and p_recipient_id = p_actor_id then
    return;
  end if;

  if not exists (
    select 1
    from public.studio_members
    where user_id = p_recipient_id
  ) then
    return;
  end if;

  insert into public.studio_notifications (
    recipient_id,
    actor_id,
    type,
    title,
    body,
    href,
    lead_id
  )
  values (
    p_recipient_id,
    p_actor_id,
    p_type,
    p_title,
    p_body,
    p_href,
    p_lead_id
  );
end;
$$;

create or replace function private.on_studio_message_inserted()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  member_row record;
  preview text;
begin
  preview := left(regexp_replace(NEW.body, '\s+', ' ', 'g'), 140);

  for member_row in
    select user_id
    from public.studio_members
    where user_id is distinct from NEW.user_id
  loop
    perform private.insert_studio_notification(
      member_row.user_id,
      NEW.user_id,
      'chat_message',
      'New chat message',
      NEW.author_name || ': ' || preview,
      '/studio/chat',
      null
    );
  end loop;

  return NEW;
end;
$$;

create or replace function private.on_studio_review_inserted()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  owner_row record;
  customer_name text;
  decision_label text;
begin
  select coalesce(nullif(full_name, ''), nullif(email, ''), 'a customer')
  into customer_name
  from public.leads
  where id = NEW.lead_id;

  decision_label := case NEW.decision
    when 'ready_for_report' then 'Ready for report'
    when 'need_more_photos' then 'Need more photos'
    when 'not_suitable' then 'Not suitable for a remote plan'
    else NEW.decision
  end;

  for owner_row in
    select user_id
    from public.studio_members
    where role = 'owner'
      and user_id is distinct from NEW.created_by
  loop
    perform private.insert_studio_notification(
      owner_row.user_id,
      NEW.created_by,
      'review_submitted',
      'Photo review submitted',
      NEW.author_name || ' reviewed ' || coalesce(customer_name, 'a customer') || ' (' || decision_label || ').',
      '/studio/customers/' || NEW.lead_id::text,
      NEW.lead_id
    );
  end loop;

  return NEW;
end;
$$;

create or replace function private.on_studio_lead_notified()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  owner_row record;
  customer_name text;
begin
  customer_name := coalesce(nullif(NEW.full_name, ''), nullif(NEW.email, ''), 'a customer');

  if NEW.payment_status is distinct from OLD.payment_status
     and NEW.payment_status = 'verified' then
    for owner_row in
      select user_id
      from public.studio_members
      where role = 'owner'
        and user_id is distinct from auth.uid()
    loop
      perform private.insert_studio_notification(
        owner_row.user_id,
        auth.uid(),
        'payment_verified',
        'Payment verified',
        customer_name || ' is now marked as paid.',
        '/studio/customers/' || NEW.id::text,
        NEW.id
      );
    end loop;
  end if;

  if NEW.assigned_to is distinct from OLD.assigned_to
     and NEW.assigned_to is not null then
    perform private.insert_studio_notification(
      NEW.assigned_to,
      auth.uid(),
      'customer_assigned',
      'Customer assigned to you',
      customer_name || ' was assigned to you.',
      '/studio/customers/' || NEW.id::text,
      NEW.id
    );
  end if;

  return NEW;
end;
$$;

drop trigger if exists studio_messages_notify on public.studio_messages;
create trigger studio_messages_notify
after insert on public.studio_messages
for each row
execute function private.on_studio_message_inserted();

drop trigger if exists studio_reviews_notify on public.studio_reviews;
create trigger studio_reviews_notify
after insert on public.studio_reviews
for each row
execute function private.on_studio_review_inserted();

drop trigger if exists studio_leads_notify on public.leads;
create trigger studio_leads_notify
after update on public.leads
for each row
execute function private.on_studio_lead_notified();

revoke all on function private.insert_studio_notification(uuid, uuid, text, text, text, text, uuid) from public;
revoke all on function private.on_studio_message_inserted() from public;
revoke all on function private.on_studio_review_inserted() from public;
revoke all on function private.on_studio_lead_notified() from public;

alter table public.studio_notifications enable row level security;

drop policy if exists "studio members read own notifications" on public.studio_notifications;
create policy "studio members read own notifications"
on public.studio_notifications
for select
to authenticated
using (
  private.is_studio_member()
  and recipient_id = auth.uid()
);

drop policy if exists "studio members update own notifications" on public.studio_notifications;
create policy "studio members update own notifications"
on public.studio_notifications
for update
to authenticated
using (
  private.is_studio_member()
  and recipient_id = auth.uid()
)
with check (
  private.is_studio_member()
  and recipient_id = auth.uid()
);

grant select, update on public.studio_notifications to authenticated;

alter table public.studio_notifications replica identity full;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'studio_notifications'
  ) then
    alter publication supabase_realtime add table public.studio_notifications;
  end if;
end
$$;
