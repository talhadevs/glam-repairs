-- Leads stay forever. Assessment photos expire after 30 days (cleaned via app cron + Storage API).

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'assessment-photos',
  'assessment-photos',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update
set public = excluded.public;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  full_name text,
  email text,
  selected_plan text,
  plan_name text,
  plan_price text,
  answers jsonb not null default '{}'::jsonb,
  image_urls text[] not null default '{}',
  photo_paths text[] not null default '{}',
  photos_expire_at timestamptz,
  photos_deleted_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_session_id_idx on public.leads (session_id);
create index if not exists leads_photos_expire_at_idx
  on public.leads (photos_expire_at)
  where photos_deleted_at is null and cardinality(photo_paths) > 0;

alter table public.leads enable row level security;

-- Service role bypasses RLS; no public policies on leads.

-- Public can view files in the public bucket (WhatsApp photo links).
drop policy if exists "Public read assessment photos" on storage.objects;
create policy "Public read assessment photos"
on storage.objects
for select
to public
using (bucket_id = 'assessment-photos');
