-- Track unfinished funnels so Studio can broadcast to people who left mid-way.

alter table public.leads
  add column if not exists funnel_complete boolean not null default true;

alter table public.leads
  add column if not exists funnel_step integer;

create index if not exists leads_funnel_complete_idx
  on public.leads (funnel_complete);
