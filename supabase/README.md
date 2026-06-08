# Supabase CMS Database — Maju Berkah Teknik

Folder ini berisi SQL untuk membuat database CMS website Maju Berkah Teknik.

## File

```txt
supabase/
├── migrations/
│   └── 001_cms_schema.sql
└── seed/
    └── 001_initial_data.sql
```

## Cara Pakai di Supabase

1. Buka Supabase Dashboard.
2. Pilih project.
3. Masuk ke menu **SQL Editor**.
4. Copy seluruh isi file:

```txt
supabase/migrations/001_cms_schema.sql
```

5. Klik **Run**.
6. Setelah sukses, copy seluruh isi file:

```txt
supabase/seed/001_initial_data.sql
```

7. Klik **Run**.

Database CMS sudah siap dipakai.

---

## Table yang Dibuat

### `categories`
Kategori produk:
- Dinamo Motor 3 Phase
- Dinamo Motor 1 Phase
- Gear Box

### `brands`
Brand produk:
- Motology
- Alliance

### `products`
Data produk utama untuk katalog.

Field penting:
- `category_id`
- `brand_id`
- `name`
- `slug`
- `image_url`
- `phase`
- `rpm`
- `capacity_kw`
- `capacity_hp`
- `mounting_type`
- `gearbox_size`
- `gearbox_ratio`
- `gearbox_type`
- `gearbox_output`
- `is_featured`
- `is_active`

### `site_contents`
Konten homepage sederhana:
- Hero
- About
- CTA

### `faqs`
Pertanyaan yang sering diajukan.

### `settings`
Setting website:
- Nama perusahaan
- Nomor WhatsApp
- Pesan default WhatsApp
- Alamat
- Email
- URL website

### `leads`
Opsional untuk form inquiry jika nanti ingin selain WhatsApp.

---

## Data Awal yang Diisi

Seed data otomatis mengisi:

- 3 kategori produk
- 2 brand
- Produk dinamo motor 3 phase berdasarkan:
  - Merk: Motology, Alliance
  - RPM: 3000, 1500, 1000, 750
  - Mounting: B3, B5, B35
- Produk dinamo motor 1 phase berdasarkan:
  - Merk: Motology, Alliance
  - RPM: 3000, 1500
  - Mounting: B3, B5, B35
- Produk gear box berdasarkan:
  - Merk: Motology, Alliance
  - Size: 50, 60, 70, 80, 100, 120, 135, 155, 175, 200, 250
  - Ratio: 10, 20, 30, 40, 50, 60
  - Tipe: WPA, WPX, WPO
- Konten homepage
- FAQ
- Setting dasar website

---

## Row Level Security

Schema sudah mengaktifkan RLS.

Public website bisa membaca:
- kategori aktif
- brand aktif
- produk aktif
- konten aktif
- FAQ aktif
- settings

Public juga bisa insert ke table `leads` jika nanti website memakai form inquiry.

Admin edit data melalui:
- Supabase Dashboard
- Service role API
- Atau admin panel khusus jika nanti dibuat

---

## Catatan WhatsApp

Setelah seed dijalankan, update table `settings`:

```txt
key = whatsapp_number
value = 628xxxxxxxxxx
```

Ganti dengan nomor WhatsApp resmi perusahaan dalam format internasional tanpa `+`.

Contoh:

```txt
6281234567890
```

---

## Query Test

Setelah run migration dan seed, test dengan query:

```sql
select count(*) from public.products;
select * from public.categories order by sort_order;
select * from public.settings order by key;
```

Perkiraan jumlah produk seed:

```txt
Dinamo 3 Phase: 2 brand x 4 RPM x 3 mounting = 24
Dinamo 1 Phase: 2 brand x 2 RPM x 3 mounting = 12
Gear Box: 2 brand x 11 size x 6 ratio x 3 tipe = 396
Total produk = 432
```

Kalau jumlah produk `432`, seed berhasil.
