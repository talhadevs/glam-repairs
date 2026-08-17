-- Team-written skin reports sent to customers as PDF.

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
        and assigned_to = auth.uid()
    );
$$;

revoke all on function private.can_access_studio_lead(uuid) from public;
grant execute on function private.can_access_studio_lead(uuid) to authenticated;

create table if not exists public.studio_reports (
  id uuid primary key default gen_random_uuid(),
  lead_id uuid not null references public.leads (id) on delete cascade,
  created_by uuid not null references auth.users (id) on delete restrict,
  author_name text not null,
  noticed text not null,
  morning_routine text not null,
  night_routine text not null,
  avoid_items text not null,
  extra_notes text,
  sent_at timestamptz,
  resend_id text,
  created_at timestamptz not null default now()
);

create index if not exists studio_reports_lead_id_created_at_idx
  on public.studio_reports (lead_id, created_at desc);

alter table public.studio_reports enable row level security;

drop policy if exists "studio members read reports" on public.studio_reports;
create policy "studio members read reports"
on public.studio_reports
for select
to authenticated
using (
  private.is_studio_member()
  and private.can_access_studio_lead(lead_id)
);

drop policy if exists "studio members insert reports" on public.studio_reports;
create policy "studio members insert reports"
on public.studio_reports
for insert
to authenticated
with check (
  private.is_studio_member()
  and created_by = auth.uid()
  and private.can_access_studio_lead(lead_id)
);

drop policy if exists "studio members update reports" on public.studio_reports;
create policy "studio members update reports"
on public.studio_reports
for update
to authenticated
using (
  private.is_studio_member()
  and private.can_access_studio_lead(lead_id)
)
with check (
  private.is_studio_member()
  and private.can_access_studio_lead(lead_id)
);

grant select, insert, update on public.studio_reports to authenticated;
