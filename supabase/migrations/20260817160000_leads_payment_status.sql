-- Payment verification for Studio customers.

alter table public.leads
  add column if not exists payment_status text not null default 'pending';

alter table public.leads
  drop constraint if exists leads_payment_status_check;

alter table public.leads
  add constraint leads_payment_status_check
  check (payment_status in ('pending', 'verified'));

create index if not exists leads_payment_status_idx
  on public.leads (payment_status);
