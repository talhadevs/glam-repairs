-- Studio dashboard: team members, shared chat, outbound email log, customer fields.

create schema if not exists private;

create table if not exists public.studio_members (
  user_id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('owner', 'staff')),
  display_name text not null,
  created_at timestamptz not null default now()
);

create index if not exists studio_members_role_idx
  on public.studio_members (role);

create table if not exists public.studio_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  author_name text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create index if not exists studio_messages_created_at_idx
  on public.studio_messages (created_at);

create table if not exists public.studio_emails (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  sent_by uuid not null references auth.users (id) on delete restrict,
  to_email text not null,
  subject text not null,
  body text not null,
  resend_id text,
  created_at timestamptz not null default now()
);

create index if not exists studio_emails_lead_id_created_at_idx
  on public.studio_emails (lead_id, created_at desc);

alter table public.leads
  add column if not exists status text not null default 'new',
  add column if not exists notes text,
  add column if not exists source text not null default 'funnel';

alter table public.leads
  drop constraint if exists leads_status_check;

alter table public.leads
  add constraint leads_status_check
  check (status in ('new', 'reviewing', 'contacted', 'done'));

alter table public.leads
  drop constraint if exists leads_source_check;

alter table public.leads
  add constraint leads_source_check
  check (source in ('funnel', 'manual'));

create index if not exists leads_created_at_idx
  on public.leads (created_at desc);

create index if not exists leads_status_idx
  on public.leads (status);

create index if not exists leads_email_idx
  on public.leads (email);

create or replace function private.is_studio_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.studio_members
    where user_id = auth.uid()
  );
$$;

create or replace function private.is_studio_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.studio_members
    where user_id = auth.uid()
      and role = 'owner'
  );
$$;

revoke all on function private.is_studio_member() from public;
revoke all on function private.is_studio_owner() from public;
grant usage on schema private to authenticated;
grant execute on function private.is_studio_member() to authenticated;
grant execute on function private.is_studio_owner() to authenticated;

alter table public.studio_members enable row level security;
alter table public.studio_messages enable row level security;
alter table public.studio_emails enable row level security;

drop policy if exists "studio members read members" on public.studio_members;
create policy "studio members read members"
on public.studio_members
for select
to authenticated
using (private.is_studio_member());

drop policy if exists "studio members read messages" on public.studio_messages;
create policy "studio members read messages"
on public.studio_messages
for select
to authenticated
using (private.is_studio_member());

drop policy if exists "studio members insert messages" on public.studio_messages;
create policy "studio members insert messages"
on public.studio_messages
for insert
to authenticated
with check (
  private.is_studio_member()
  and user_id = auth.uid()
);

drop policy if exists "studio members read emails" on public.studio_emails;
create policy "studio members read emails"
on public.studio_emails
for select
to authenticated
using (private.is_studio_member());

drop policy if exists "studio members insert emails" on public.studio_emails;
create policy "studio members insert emails"
on public.studio_emails
for insert
to authenticated
with check (
  private.is_studio_member()
  and sent_by = auth.uid()
);

drop policy if exists "studio members read leads" on public.leads;
create policy "studio members read leads"
on public.leads
for select
to authenticated
using (private.is_studio_member());

drop policy if exists "studio members insert leads" on public.leads;
create policy "studio members insert leads"
on public.leads
for insert
to authenticated
with check (private.is_studio_member());

drop policy if exists "studio members update leads" on public.leads;
create policy "studio members update leads"
on public.leads
for update
to authenticated
using (private.is_studio_member())
with check (private.is_studio_member());

grant select on public.studio_members to authenticated;
grant select, insert on public.studio_messages to authenticated;
grant select, insert on public.studio_emails to authenticated;
grant select, insert, update on public.leads to authenticated;

do $$
begin
  if not exists (
    select 1
    from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'studio_messages'
  ) then
    alter publication supabase_realtime add table public.studio_messages;
  end if;
end
$$;
