-- GuitarLA: catalogue table and image bucket.
-- Run it once in the SQL Editor of the Supabase project.

create table public.guitars (
  id bigint generated always as identity primary key,
  name text not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  image text not null,
  created_at timestamptz not null default now()
);

-- Anyone can read the catalogue; nobody can write it from the browser (yet).
alter table public.guitars enable row level security;

create policy "Anyone can read the guitars"
  on public.guitars for select
  to anon, authenticated
  using (true);

-- Public bucket for the guitar images: every file is readable by its URL,
-- so it needs no policy for reading. Nobody can upload from the browser (yet).
insert into storage.buckets (id, name, public)
values ('guitars', 'guitars', true);