-- Optional (recommended) user profile table for storing full name beyond auth.
-- Run this in Supabase SQL editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read/update their own profile.
create policy "profiles_select_own"
on public.profiles
for select
using (auth.uid() = id);

create policy "profiles_update_own"
on public.profiles
for update
using (auth.uid() = id);

-- Auto-create profile row on sign-up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Learning Paths Table
create table if not exists public.learning_paths (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  topic text not null,
  data jsonb not null,
  created_at timestamptz not null default now()
);

alter table public.learning_paths enable row level security;

create policy "learning_paths_select_own"
on public.learning_paths for select
using (auth.uid() = user_id);

create policy "learning_paths_insert_own"
on public.learning_paths for insert
with check (auth.uid() = user_id);

create policy "learning_paths_update_own"
on public.learning_paths for update
using (auth.uid() = user_id);

create policy "learning_paths_delete_own"
on public.learning_paths for delete
using (auth.uid() = user_id);

-- Lesson Progress Table
create table if not exists public.lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  path_id uuid not null references public.learning_paths (id) on delete cascade,
  lesson_id text not null,
  completed boolean not null default false,
  updated_at timestamptz not null default now(),
  unique(user_id, path_id, lesson_id)
);

alter table public.lesson_progress enable row level security;

create policy "lesson_progress_select_own"
on public.lesson_progress for select
using (auth.uid() = user_id);

create policy "lesson_progress_upsert_own"
on public.lesson_progress for insert
with check (auth.uid() = user_id);

create policy "lesson_progress_update_own"
on public.lesson_progress for update
using (auth.uid() = user_id);
