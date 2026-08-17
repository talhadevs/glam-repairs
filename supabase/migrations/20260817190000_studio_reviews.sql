-- Team image reviews for the owner, plus owner-granted report send permission.

alter table public.leads
  add column if not exists report_sender_id uuid references public.studio_members (user_id) on delete set null;

create index if not exists leads_report_sender_id_idx
  on public.leads (report_sender_id);

create or replace function private.lead_assigned_to(p_lead_id uuid)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select assigned_to
  from public.leads
  where id = p_lead_id;
$$;

create or replace function private.lead_report_sender(p_lead_id uuid)
returns uuid
language sql
stable
security definer
set search_path = ''
as $$
  select report_sender_id
  from public.leads
  where id = p_lead_id;
$$;

create or replace function private.can_access_studio_lead(p_lead_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    private.is_studio_owner()
    or exists (
      select 1
      from public.leads
      where id = p_lead_id
        and (
          assigned_to = auth.uid()
          or report_sender_id = auth.uid()
        )
    );
$$;

create or replace function private.can_send_studio_report(p_lead_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    private.is_studio_owner()
    or exists (
      select 1
      from public.leads
      where id = p_lead_id
        and report_sender_id = auth.uid()
    );
$$;

revoke all on function private.lead_assigned_to(uuid) from public;
revoke all on function private.lead_report_sender(uuid) from public;
revoke all on function private.can_access_studio_lead(uuid) from public;
revoke all on function private.can_send_studio_report(uuid) from public;
grant execute on function private.lead_assigned_to(uuid) to authenticated;
grant execute on function private.lead_report_sender(uuid) to authenticated;
grant execute on function private.can_access_studio_lead(uuid) to authenticated;
grant execute on function private.can_send_studio_report(uuid) to authenticated;

drop policy if exists "studio members read leads" on public.leads;
create policy "studio members read leads"
on public.leads
for select
to authenticated
using (
  private.is_studio_owner()
  or (
    private.is_studio_member()
    and (
      assigned_to = auth.uid()
      or report_sender_id = auth.uid()
    )
  )
);

drop policy if exists "studio members update leads" on public.leads;
create policy "studio members update leads"
on public.leads
for update
to authenticated
using (
  private.is_studio_owner()
  or (
    private.is_studio_member()
    and (
      assigned_to = auth.uid()
      or report_sender_id = auth.uid()
    )
  )
)
with check (
  private.is_studio_owner()
  or (
    private.is_studio_member()
    and assigned_to is not distinct from private.lead_assigned_to(id)
    and report_sender_id is not distinct from private.lead_report_sender(id)
    and (
      private.lead_assigned_to(id) = auth.uid()
      or private.lead_report_sender(id) = auth.uid()
    )
  )
);

drop policy if exists "studio members insert reports" on public.studio_reports;
create policy "studio members insert reports"
on public.studio_reports
for insert
to authenticated
with check (
  private.is_studio_member()
  and created_by = auth.uid()
  and private.can_send_studio_report(lead_id)
);

create table if not exists public.studio_reviews (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  created_by uuid not null references auth.users (id) on delete restrict,
  author_name text not null,
  decision text not null check (
    decision in ('ready_for_report', 'need_more_photos', 'not_suitable')
  ),
  findings text not null,
  noticed text,
  morning_routine text,
  night_routine text,
  avoid_items text,
  extra_notes text,
  created_at timestamptz not null default now()
);

create index if not exists studio_reviews_lead_id_created_at_idx
  on public.studio_reviews (lead_id, created_at desc);

alter table public.studio_reviews enable row level security;

drop policy if exists "studio members read reviews" on public.studio_reviews;
create policy "studio members read reviews"
on public.studio_reviews
for select
to authenticated
using (
  private.is_studio_member()
  and private.can_access_studio_lead(lead_id)
);

drop policy if exists "studio members insert reviews" on public.studio_reviews;
create policy "studio members insert reviews"
on public.studio_reviews
for insert
to authenticated
with check (
  private.is_studio_member()
  and created_by = auth.uid()
  and private.can_access_studio_lead(lead_id)
);

grant select, insert on public.studio_reviews to authenticated;
