-- =====================================================================
-- Sudan Creative Hub: database schema
-- Run once: Supabase dashboard > SQL Editor > New query > paste > Run.
-- The FIRST user you create becomes the admin automatically.
-- =====================================================================

-- ---------- users and roles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'viewer' check (role in ('admin','editor','viewer')),
  created_at timestamptz not null default now()
);

create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email,
    case when not exists (select 1 from public.profiles) then 'admin' else 'viewer' end);
  return new;
end $$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.is_staff() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role in ('admin','editor'))
$$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin')
$$;

create or replace function public.touch_updated_at() returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

-- ---------- content tables ----------
create table if not exists public.site_settings (
  key text primary key,
  value text,
  updated_at timestamptz not null default now()
);

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text default '',
  details text[] not null default '{}',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.models (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  gender text not null check (gender in ('female','male')),
  bio text default '',
  skills text[] not null default '{}',
  specialties text[] not null default '{}',
  photos text[] not null default '{}',
  showreel_url text,
  showreel_poster text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.video_projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text default '',
  category text not null,
  video_url text not null,
  thumbnail text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.brand_projects (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  year text,
  overview text default '',
  cover text,
  logo_image text,
  palette jsonb not null default '[]',
  fonts jsonb not null default '[]',
  images text[] not null default '{}',
  guidelines_pdf text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null check (category in ('graphic-design','photography','advertising-campaigns')),
  image text not null,
  description text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.clients (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  logo text not null,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ---------- inquiries and audit trail ----------
create table if not exists public.inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  service text not null,
  details text not null,
  status text not null default 'new' check (status in ('new','handled')),
  ip_hash text,
  created_at timestamptz not null default now()
);
create index if not exists inquiries_ip_idx on public.inquiries (ip_hash, created_at desc);

create table if not exists public.audit_log (
  id bigint generated always as identity primary key,
  actor_id uuid,
  actor_email text,
  action text not null,
  resource text not null,
  record_id text,
  detail jsonb,
  created_at timestamptz not null default now()
);

-- ---------- updated_at triggers ----------
do $$
declare t text;
begin
  foreach t in array array['services','models','video_projects','brand_projects','portfolio_items','clients'] loop
    execute format('drop trigger if exists touch_%1$s on public.%1$I', t);
    execute format('create trigger touch_%1$s before update on public.%1$I for each row execute function public.touch_updated_at()', t);
  end loop;
end $$;

-- ---------- row-level security ----------
alter table public.profiles enable row level security;
alter table public.site_settings enable row level security;
alter table public.inquiries enable row level security;
alter table public.audit_log enable row level security;

drop policy if exists "own profile or admin" on public.profiles;
create policy "own profile or admin" on public.profiles for select to authenticated
  using (id = auth.uid() or public.is_admin());
drop policy if exists "admin updates profiles" on public.profiles;
create policy "admin updates profiles" on public.profiles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read settings" on public.site_settings;
create policy "public read settings" on public.site_settings for select using (true);
drop policy if exists "staff write settings" on public.site_settings;
create policy "staff write settings" on public.site_settings for insert to authenticated with check (public.is_staff());
drop policy if exists "staff update settings" on public.site_settings;
create policy "staff update settings" on public.site_settings for update to authenticated
  using (public.is_staff()) with check (public.is_staff());

-- Inquiries are inserted by the server only (service role). Staff can read and update them.
drop policy if exists "staff read inquiries" on public.inquiries;
create policy "staff read inquiries" on public.inquiries for select to authenticated using (public.is_staff());
drop policy if exists "staff update inquiries" on public.inquiries;
create policy "staff update inquiries" on public.inquiries for update to authenticated
  using (public.is_staff()) with check (public.is_staff());
drop policy if exists "admin delete inquiries" on public.inquiries;
create policy "admin delete inquiries" on public.inquiries for delete to authenticated using (public.is_admin());

drop policy if exists "staff write audit" on public.audit_log;
create policy "staff write audit" on public.audit_log for insert to authenticated
  with check (public.is_staff() and actor_id = auth.uid());
drop policy if exists "staff read audit" on public.audit_log;
create policy "staff read audit" on public.audit_log for select to authenticated using (public.is_staff());

do $$
declare t text;
begin
  foreach t in array array['services','models','video_projects','brand_projects','portfolio_items','clients'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "public read" on public.%I', t);
    execute format('create policy "public read" on public.%I for select using (published = true)', t);
    execute format('drop policy if exists "staff read all" on public.%I', t);
    execute format('create policy "staff read all" on public.%I for select to authenticated using (public.is_staff())', t);
    execute format('drop policy if exists "staff insert" on public.%I', t);
    execute format('create policy "staff insert" on public.%I for insert to authenticated with check (public.is_staff())', t);
    execute format('drop policy if exists "staff update" on public.%I', t);
    execute format('create policy "staff update" on public.%I for update to authenticated using (public.is_staff()) with check (public.is_staff())', t);
    execute format('drop policy if exists "admin delete" on public.%I', t);
    execute format('create policy "admin delete" on public.%I for delete to authenticated using (public.is_admin())', t);
  end loop;
end $$;

-- ---------- starting content: the nine services ----------
insert into public.services (title, summary, details, sort_order)
select * from (values
 ('Marketing Strategy & Consulting','A clear plan before any money is spent.', array['Marketing strategy development','Market and audience research','Marketing planning and consulting'], 1),
 ('Video Production','Films and reels that hold attention to the last second.', array['Reels production','Commercial advertising videos','Filming and directing','Editing and post-production'], 2),
 ('Branding & Visual Identity','An identity people recognise before they read the name.', array['Logo design','Brand identity development','Brand guidelines','Brand applications'], 3),
 ('Graphic Design','Design that is built for the feed, the shelf and the street.', array['Social media designs','Advertising creatives','Marketing materials and print designs'], 4),
 ('Models & Talent Casting','The right faces for your campaign, coordinated for you.', array['Male and female commercial models','Talent selection for campaigns','Model coordination for photoshoots and video production'], 5),
 ('Photography & Commercial Production','Images that sell the product before the caption does.', array['Product photography','Commercial photography','Professional photoshoots'], 6),
 ('Creative Content & Scriptwriting','Ideas and words that sound like your brand.', array['Marketing content creation','Video scriptwriting','Creative concept development','Advertising copywriting'], 7),
 ('Social Media Management','Consistent presence without the daily scramble.', array['Content planning','Account management','Content scheduling','Performance monitoring'], 8),
 ('Digital Advertising & Campaign Management','Paid campaigns that are watched, measured and improved.', array['Digital advertising campaigns','Paid advertising management','Campaign performance analysis'], 9)
) as v(title, summary, details, sort_order)
where not exists (select 1 from public.services);
