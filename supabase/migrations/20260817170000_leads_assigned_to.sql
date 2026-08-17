-- Owner assigns customers to team members. Staff only see assigned leads.

alter table public.leads
  add column if not exists assigned_to uuid references public.studio_members (user_id) on delete set null;

create index if not exists leads_assigned_to_idx
  on public.leads (assigned_to);

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

drop policy if exists "studio members read leads" on public.leads;
create policy "studio members read leads"
on public.leads
for select
to authenticated
using (
  private.is_studio_owner()
  or (
    private.is_studio_member()
    and assigned_to = auth.uid()
  )
);

drop policy if exists "studio members insert leads" on public.leads;
create policy "studio members insert leads"
on public.leads
for insert
to authenticated
with check (
  private.is_studio_member()
  and (
    private.is_studio_owner()
    or assigned_to is null
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
    and assigned_to = auth.uid()
  )
)
with check (
  private.is_studio_owner()
  or (
    private.is_studio_member()
    and assigned_to = auth.uid()
  )
);

drop policy if exists "studio members read emails" on public.studio_emails;
create policy "studio members read emails"
on public.studio_emails
for select
to authenticated
using (
  private.is_studio_member()
  and private.can_access_studio_lead(lead_id)
);

drop policy if exists "studio members insert emails" on public.studio_emails;
create policy "studio members insert emails"
on public.studio_emails
for insert
to authenticated
with check (
  private.is_studio_member()
  and sent_by = auth.uid()
  and private.can_access_studio_lead(lead_id)
);
