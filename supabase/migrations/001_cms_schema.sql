-- Maju Berkah Teknik CMS Schema for Supabase
-- Run this file in Supabase SQL Editor before running seed data.

create extension if not exists pgcrypto;

-- Timestamp helper
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Product categories: dinamo 3 phase, dinamo 1 phase, gear box
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  image_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists categories_set_updated_at on public.categories;
create trigger categories_set_updated_at
before update on public.categories
for each row execute function public.set_updated_at();

-- Brands: Motology, Alliance
create table if not exists public.brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists brands_set_updated_at on public.brands;
create trigger brands_set_updated_at
before update on public.brands
for each row execute function public.set_updated_at();

-- Products CMS
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.categories(id) on delete set null,
  brand_id uuid references public.brands(id) on delete set null,

  name text not null,
  slug text not null unique,
  sku text,
  short_description text,
  description text,
  image_url text,
  gallery_urls text[] not null default '{}',

  -- Dinamo motor fields
  phase text check (phase in ('1 Phase', '3 Phase') or phase is null),
  rpm integer,
  capacity_kw numeric(10,2),
  capacity_hp numeric(10,2),
  mounting_type text check (mounting_type in ('B3', 'B5', 'B35') or mounting_type is null),
  mounting_label text,

  -- Gear box fields
  gearbox_size integer,
  gearbox_ratio integer,
  gearbox_type text check (gearbox_type in ('WPA', 'WPX', 'WPO') or gearbox_type is null),
  gearbox_output text,

  -- Commerce / publishing fields
  price numeric(14,2),
  price_note text default 'Hubungi kami untuk penawaran harga',
  stock_status text not null default 'available' check (stock_status in ('available', 'preorder', 'out_of_stock')),
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order integer not null default 0,

  seo_title text,
  seo_description text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint products_dinamo_or_gearbox_check check (
    phase is not null
    or gearbox_type is not null
  )
);

create index if not exists products_category_id_idx on public.products(category_id);
create index if not exists products_brand_id_idx on public.products(brand_id);
create index if not exists products_phase_idx on public.products(phase);
create index if not exists products_rpm_idx on public.products(rpm);
create index if not exists products_mounting_type_idx on public.products(mounting_type);
create index if not exists products_gearbox_size_idx on public.products(gearbox_size);
create index if not exists products_gearbox_ratio_idx on public.products(gearbox_ratio);
create index if not exists products_gearbox_type_idx on public.products(gearbox_type);
create index if not exists products_is_active_idx on public.products(is_active);
create index if not exists products_is_featured_idx on public.products(is_featured);

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

-- Homepage and simple CMS content
create table if not exists public.site_contents (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  title text,
  subtitle text,
  content text,
  image_url text,
  button_label text,
  button_url text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists site_contents_set_updated_at on public.site_contents;
create trigger site_contents_set_updated_at
before update on public.site_contents
for each row execute function public.set_updated_at();

-- FAQ CMS
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists faqs_set_updated_at on public.faqs;
create trigger faqs_set_updated_at
before update on public.faqs
for each row execute function public.set_updated_at();

-- Global website settings
create table if not exists public.settings (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  value text,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists settings_set_updated_at on public.settings;
create trigger settings_set_updated_at
before update on public.settings
for each row execute function public.set_updated_at();

-- Optional lead capture if later needed besides WhatsApp
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text,
  company text,
  phone text,
  email text,
  product_id uuid references public.products(id) on delete set null,
  message text,
  source text default 'website',
  status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'closed', 'lost')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_product_id_idx on public.leads(product_id);
create index if not exists leads_status_idx on public.leads(status);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
before update on public.leads
for each row execute function public.set_updated_at();

-- Public read access for published website content.
-- Drop policies first so this migration can be rerun safely.
drop policy if exists "Public can read active categories" on public.categories;
drop policy if exists "Public can read active brands" on public.brands;
drop policy if exists "Public can read active products" on public.products;
drop policy if exists "Public can read active site contents" on public.site_contents;
drop policy if exists "Public can read active faqs" on public.faqs;
drop policy if exists "Public can read settings" on public.settings;
drop policy if exists "Public can insert leads" on public.leads;

alter table public.categories enable row level security;
alter table public.brands enable row level security;
alter table public.products enable row level security;
alter table public.site_contents enable row level security;
alter table public.faqs enable row level security;
alter table public.settings enable row level security;
alter table public.leads enable row level security;

create policy "Public can read active categories"
on public.categories for select
using (is_active = true);

create policy "Public can read active brands"
on public.brands for select
using (is_active = true);

create policy "Public can read active products"
on public.products for select
using (is_active = true);

create policy "Public can read active site contents"
on public.site_contents for select
using (is_active = true);

create policy "Public can read active faqs"
on public.faqs for select
using (is_active = true);

create policy "Public can read settings"
on public.settings for select
using (true);

-- If a public inquiry form is added later, anon users may insert leads.
create policy "Public can insert leads"
on public.leads for insert
with check (true);

-- Admin writes are managed through Supabase Dashboard / service role.
