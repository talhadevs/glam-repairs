-- Team-level permissions: verify payment and send reports.

alter table public.studio_members
  add column if not exists can_verify_payment boolean not null default false;

alter table public.studio_members
  add column if not exists can_send_report boolean not null default false;

update public.studio_members
set
  can_verify_payment = true,
  can_send_report = true
where role = 'owner';

create or replace function private.member_can_send_report()
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
      from public.studio_members
      where user_id = auth.uid()
        and can_send_report = true
    );
$$;

revoke all on function private.member_can_send_report() from public;
grant execute on function private.member_can_send_report() to authenticated;

create or replace function private.can_send_studio_report(p_lead_id uuid)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    private.member_can_send_report()
    and private.can_access_studio_lead(p_lead_id);
$$;
