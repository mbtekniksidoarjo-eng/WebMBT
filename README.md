# Maju Berkah Teknik Website

Website katalog produk **Dinamo Motor** dan **Gear Box** untuk Maju Berkah Teknik.

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase client ready
- Vercel deployment ready
- WhatsApp CTA integration

## Produk

### Dinamo Motor 3 Phase
- Merk: Motology, Alliance
- RPM: 3000, 1500, 1000, 750
- Kapasitas: 0,18 KW – 315 KW / 0,25 HP – 410 HP
- Tipe: Foot mounted B3, Flange mounted B5, Foot flange mounted B35

### Dinamo Motor 1 Phase
- Merk: Motology, Alliance
- RPM: 3000, 1500
- Kapasitas: 0,18 KW – 4 KW / 0,25 HP – 5 HP
- Tipe: Foot mounted B3, Flange mounted B5, Foot flange mounted B35

### Gear Box
- Merk: Motology, Alliance
- Size: 50, 60, 70, 80, 100, 120, 135, 155, 175, 200, 250
- Ratio: 10, 20, 30, 40, 50, 60
- Tipe: WPA output samping, WPX output bawah, WPO output atas

## Setup

```bash
npm install
npm run dev
```

Buka:

```txt
http://localhost:3000
```

## Environment

Copy `.env.example` menjadi `.env.local`, lalu isi:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
NEXT_PUBLIC_COMPANY_ADDRESS=Pondok Mutiara Blok AA no 6 Sidoarjo
NEXT_PUBLIC_COMPANY_EMAIL=mbtekniksidoarjo@gmail.com
NEXT_PUBLIC_SITE_URL=https://maju-berkah-teknik.vercel.app
```

> Penting: ganti `628xxxxxxxxxx` dengan nomor WhatsApp resmi perusahaan sebelum publish.

## Folder Asset

Logo dan foto produk sudah disimpan di:

```txt
public/images/logo.jpeg
public/images/products/
```

## Build

```bash
npm run build
```

## Deploy Vercel

1. Push folder `Website` ke GitHub.
2. Import repository di Vercel.
3. Isi environment variables.
4. Deploy.

## Supabase CMS Database

SQL schema dan seed data CMS sudah tersedia di:

```txt
supabase/migrations/001_cms_schema.sql
supabase/seed/001_initial_data.sql
```

Instruksi lengkap ada di:

```txt
supabase/README.md
```

Cara cepat:

1. Buka Supabase Dashboard.
2. Masuk **SQL Editor**.
3. Run `supabase/migrations/001_cms_schema.sql`.
4. Run `supabase/seed/001_initial_data.sql`.
5. Update `settings.whatsapp_number` dengan nomor WhatsApp resmi.

Seed data awal berisi 432 produk kombinasi:

- Dinamo Motor 3 Phase
- Dinamo Motor 1 Phase
- Gear Box WPA / WPX / WPO

## CMS Admin CRUD

Halaman CMS admin tersedia di:

```txt
/cms
/cms/products
/cms/categories
/cms/brands
/cms/faqs
/cms/settings
```

Fitur CMS:

- Login admin sederhana dengan `CMS_ADMIN_PASSWORD`
- Create, update, delete produk
- Create, update, delete kategori
- Create, update, delete brand
- Create, update, delete FAQ
- Create, update, delete settings

Agar CRUD aktif, `.env.local` wajib berisi:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
CMS_ADMIN_PASSWORD=change-this-strong-password
NEXT_PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
NEXT_PUBLIC_COMPANY_ADDRESS=Pondok Mutiara Blok AA no 6 Sidoarjo
NEXT_PUBLIC_COMPANY_EMAIL=mbtekniksidoarjo@gmail.com
```

Catatan keamanan:

- `SUPABASE_SERVICE_ROLE_KEY` hanya dipakai server-side.
- Jangan gunakan prefix `NEXT_PUBLIC_` untuk service role key.
- Gunakan password admin yang kuat sebelum deploy.
