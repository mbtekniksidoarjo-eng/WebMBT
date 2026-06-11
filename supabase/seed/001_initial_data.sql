-- Maju Berkah Teknik CMS Seed Data
-- Run after supabase/migrations/001_cms_schema.sql

insert into public.categories (name, slug, description, image_url, sort_order)
values
  (
    'Dinamo Motor 3 Phase',
    'dinamo-motor-3-phase',
    'Dinamo motor industri 3 phase dengan pilihan RPM lengkap dan kapasitas besar untuk kebutuhan produksi, conveyor, pompa, blower, dan mesin pabrik.',
    '/images/products/3_Phase_Foot_Mounted_B3/1.jpeg',
    1
  ),
  (
    'Dinamo Motor 1 Phase',
    'dinamo-motor-1-phase',
    'Dinamo motor 1 phase untuk kebutuhan workshop, mesin ringan, pompa kecil, fan, dan aplikasi daya kecil hingga menengah.',
    '/images/products/1_Phase_Foot_Mounted_B3/1.jpeg',
    2
  ),
  (
    'Gear Box',
    'gear-box',
    'Gear box reducer dengan pilihan size, ratio, dan posisi output untuk kebutuhan transmisi daya industri yang fleksibel.',
    '/images/products/Gear Box_WPA/1.jpeg',
    3
  )
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  image_url = excluded.image_url,
  sort_order = excluded.sort_order,
  is_active = true;

insert into public.brands (name, slug, description)
values
  ('Motology', 'motology', 'Brand produk mekanikal industri untuk dinamo motor dan gear box.'),
  ('Alliance', 'alliance', 'Brand produk mekanikal industri untuk dinamo motor dan gear box.')
on conflict (slug) do update set
  name = excluded.name,
  description = excluded.description,
  is_active = true;

-- Dinamo Motor 3 Phase: generate common product options from RPM and mounting type.
insert into public.products (
  category_id,
  brand_id,
  name,
  slug,
  short_description,
  description,
  image_url,
  phase,
  rpm,
  capacity_kw,
  capacity_hp,
  mounting_type,
  mounting_label,
  price_note,
  is_featured,
  sort_order,
  seo_title,
  seo_description
)
select
  c.id,
  b.id,
  concat('Dinamo Motor 3 Phase ', b.name, ' ', r.rpm, ' RPM ', m.code),
  concat('dinamo-motor-3-phase-', lower(b.slug), '-', r.rpm, '-rpm-', lower(m.code)),
  concat('Dinamo motor 3 phase ', b.name, ' ', r.rpm, ' RPM tipe ', m.label, '.'),
  concat('Dinamo motor 3 phase merk ', b.name, ' dengan pilihan kapasitas 0,18 KW sampai 315 KW / 0,25 HP sampai 410 HP. Cocok untuk kebutuhan mesin industri, conveyor, pompa, blower, compressor, dan aplikasi mekanikal lainnya.'),
  case
    when m.code = 'B5' then '/images/products/3_Phase_Flange_Mounted_B5/1.jpeg'
    else '/images/products/3_Phase_Foot_Mounted_B3/1.jpeg'
  end,
  '3 Phase',
  r.rpm,
  null,
  null,
  m.code,
  m.label,
  'Hubungi kami untuk penawaran harga',
  (r.rpm = 1500 and m.code = 'B3'),
  r.sort_order + m.sort_order + case when b.slug = 'motology' then 0 else 100 end,
  concat('Jual Dinamo Motor 3 Phase ', b.name, ' ', r.rpm, ' RPM ', m.code),
  concat('Dinamo motor 3 phase ', b.name, ' ', r.rpm, ' RPM tipe ', m.label, '. Konsultasi spesifikasi dan penawaran via WhatsApp.')
from public.categories c
cross join public.brands b
cross join (values (3000, 1), (1500, 2), (1000, 3), (750, 4)) as r(rpm, sort_order)
cross join (values ('B3', 'Foot mounted (B3)', 10), ('B5', 'Flange mounted (B5)', 20), ('B35', 'Foot flange mounted (B35)', 30)) as m(code, label, sort_order)
where c.slug = 'dinamo-motor-3-phase'
on conflict (slug) do update set
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
  image_url = excluded.image_url,
  phase = excluded.phase,
  rpm = excluded.rpm,
  mounting_type = excluded.mounting_type,
  mounting_label = excluded.mounting_label,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  is_active = true;

-- Dinamo Motor 1 Phase: generate common product options from RPM and mounting type.
insert into public.products (
  category_id,
  brand_id,
  name,
  slug,
  short_description,
  description,
  image_url,
  phase,
  rpm,
  capacity_kw,
  capacity_hp,
  mounting_type,
  mounting_label,
  price_note,
  is_featured,
  sort_order,
  seo_title,
  seo_description
)
select
  c.id,
  b.id,
  concat('Dinamo Motor 1 Phase ', b.name, ' ', r.rpm, ' RPM ', m.code),
  concat('dinamo-motor-1-phase-', lower(b.slug), '-', r.rpm, '-rpm-', lower(m.code)),
  concat('Dinamo motor 1 phase ', b.name, ' ', r.rpm, ' RPM tipe ', m.label, '.'),
  concat('Dinamo motor 1 phase merk ', b.name, ' dengan pilihan kapasitas 0,18 KW sampai 4 KW / 0,25 HP sampai 5 HP. Cocok untuk workshop, mesin ringan, pompa kecil, fan, dan aplikasi umum.'),
  case
    when m.code = 'B5' then '/images/products/1_Phase_Flange_Mounted_B5/1.jpeg'
    when m.code = 'B35' then '/images/products/1_Phase_Foot_Flange_Mounted_B35/1.jpeg'
    else '/images/products/1_Phase_Foot_Mounted_B3/1.jpeg'
  end,
  '1 Phase',
  r.rpm,
  null,
  null,
  m.code,
  m.label,
  'Hubungi kami untuk penawaran harga',
  (r.rpm = 1500 and m.code = 'B3'),
  r.sort_order + m.sort_order + case when b.slug = 'motology' then 200 else 300 end,
  concat('Jual Dinamo Motor 1 Phase ', b.name, ' ', r.rpm, ' RPM ', m.code),
  concat('Dinamo motor 1 phase ', b.name, ' ', r.rpm, ' RPM tipe ', m.label, '. Konsultasi spesifikasi dan penawaran via WhatsApp.')
from public.categories c
cross join public.brands b
cross join (values (3000, 1), (1500, 2)) as r(rpm, sort_order)
cross join (values ('B3', 'Foot mounted (B3)', 10), ('B5', 'Flange mounted (B5)', 20), ('B35', 'Foot flange mounted (B35)', 30)) as m(code, label, sort_order)
where c.slug = 'dinamo-motor-1-phase'
on conflict (slug) do update set
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
  image_url = excluded.image_url,
  phase = excluded.phase,
  rpm = excluded.rpm,
  mounting_type = excluded.mounting_type,
  mounting_label = excluded.mounting_label,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  is_active = true;

-- Gear Box: generate options from type, size, and ratio.
insert into public.products (
  category_id,
  brand_id,
  name,
  slug,
  short_description,
  description,
  image_url,
  gearbox_size,
  gearbox_ratio,
  gearbox_type,
  gearbox_output,
  price_note,
  is_featured,
  sort_order,
  seo_title,
  seo_description
)
select
  c.id,
  b.id,
  concat('Gear Box ', b.name, ' ', t.code, ' Size ', s.size, ' Ratio ', ratio.ratio),
  concat('gear-box-', lower(b.slug), '-', lower(t.code), '-size-', s.size, '-ratio-', ratio.ratio),
  concat('Gear box ', b.name, ' tipe ', t.code, ' size ', s.size, ' ratio ', ratio.ratio, ' dengan ', lower(t.output_label), '.'),
  concat('Gear box reducer merk ', b.name, ' tipe ', t.code, ' dengan ', lower(t.output_label), '. Tersedia pilihan size dan ratio untuk kebutuhan transmisi daya industri.'),
  case
    when t.code = 'WPX' then '/images/products/Gear Box_WPX/1.jpeg'
    when t.code = 'WPO' then '/images/products/Gear Box_WPO/1.jpeg'
    else '/images/products/Gear Box_WPA/1.jpeg'
  end,
  s.size,
  ratio.ratio,
  t.code,
  t.output_label,
  'Hubungi kami untuk penawaran harga',
  (s.size in (80, 100) and ratio.ratio in (20, 30) and t.code = 'WPA'),
  s.sort_order + ratio.sort_order + t.sort_order + case when b.slug = 'motology' then 400 else 900 end,
  concat('Jual Gear Box ', b.name, ' ', t.code, ' Size ', s.size, ' Ratio ', ratio.ratio),
  concat('Gear box ', b.name, ' ', t.code, ' size ', s.size, ' ratio ', ratio.ratio, '. Konsultasi spesifikasi dan penawaran via WhatsApp.')
from public.categories c
cross join public.brands b
cross join (values
  (50, 1), (60, 2), (70, 3), (80, 4), (100, 5), (120, 6),
  (135, 7), (155, 8), (175, 9), (200, 10), (250, 11)
) as s(size, sort_order)
cross join (values (10, 1), (20, 2), (30, 3), (40, 4), (50, 5), (60, 6)) as ratio(ratio, sort_order)
cross join (values ('WPA', 'Output samping', 10), ('WPX', 'Output bawah', 20), ('WPO', 'Output atas', 30)) as t(code, output_label, sort_order)
where c.slug = 'gear-box'
on conflict (slug) do update set
  name = excluded.name,
  short_description = excluded.short_description,
  description = excluded.description,
  image_url = excluded.image_url,
  gearbox_size = excluded.gearbox_size,
  gearbox_ratio = excluded.gearbox_ratio,
  gearbox_type = excluded.gearbox_type,
  gearbox_output = excluded.gearbox_output,
  seo_title = excluded.seo_title,
  seo_description = excluded.seo_description,
  is_active = true;

insert into public.site_contents (key, title, subtitle, content, image_url, button_label, button_url, sort_order)
values
  (
    'hero',
    'Solusi Dinamo Motor & Gear Box Industri Terpercaya',
    'Maju Berkah Teknik menyediakan dinamo motor 1 phase, 3 phase, dan gear box berkualitas untuk kebutuhan industri, workshop, produksi, dan maintenance.',
    'Pilih produk berdasarkan kategori, merk, RPM, kapasitas, mounting, size, ratio, dan tipe output. Konsultasi spesifikasi langsung via WhatsApp.',
    '/images/products/3_Phase_Foot_Mounted_B3/1.jpeg',
    'Minta Penawaran via WhatsApp',
    '#whatsapp',
    1
  ),
  (
    'about',
    'Partner kebutuhan dinamo motor dan gear box industri',
    'Maju Berkah Teknik membantu pelanggan menemukan produk mekanikal industri sesuai kebutuhan teknis.',
    'Fokus kami adalah membuat pelanggan cepat memahami kategori produk, spesifikasi penting, dan langsung terhubung dengan tim melalui WhatsApp untuk konsultasi atau penawaran.',
    '/images/logo.jpeg',
    'Konsultasi Sekarang',
    '#whatsapp',
    2
  ),
  (
    'cta',
    'Bingung menentukan spesifikasi yang tepat?',
    'Tim kami siap membantu merekomendasikan dinamo motor atau gear box yang sesuai dengan kebutuhan mesin Anda.',
    'Kirim kebutuhan phase, RPM, kapasitas, mounting, size, ratio, atau foto produk lama melalui WhatsApp.',
    null,
    'Konsultasi via WhatsApp',
    '#whatsapp',
    3
  )
on conflict (key) do update set
  title = excluded.title,
  subtitle = excluded.subtitle,
  content = excluded.content,
  image_url = excluded.image_url,
  button_label = excluded.button_label,
  button_url = excluded.button_url,
  sort_order = excluded.sort_order,
  is_active = true;

insert into public.faqs (question, answer, sort_order)
values
  ('Apakah bisa konsultasi spesifikasi sebelum membeli?', 'Ya. Calon pelanggan dapat langsung berkonsultasi melalui WhatsApp untuk menentukan phase, RPM, kapasitas, mounting, size, ratio, dan tipe produk yang sesuai.', 1),
  ('Apakah tersedia dinamo motor 1 phase dan 3 phase?', 'Ya. Tersedia dinamo motor 1 phase dan 3 phase dengan pilihan merk Motology dan Alliance.', 2),
  ('Apakah tersedia gear box dengan berbagai ratio?', 'Ya. Gear box tersedia dengan pilihan ratio 10, 20, 30, 40, 50, dan 60.', 3),
  ('Bagaimana cara meminta penawaran harga?', 'Klik tombol WhatsApp pada website, lalu kirim detail kebutuhan produk. Tim Maju Berkah Teknik akan membantu proses penawaran.', 4),
  ('Apakah data produk bisa dikelola tanpa edit kode?', 'Ya. Data produk, kategori, brand, konten homepage, FAQ, dan setting dapat dikelola melalui Supabase.', 5)
on conflict do nothing;

insert into public.settings (key, value, description)
values
  ('company_name', 'Maju Berkah Teknik', 'Nama perusahaan'),
  ('company_tagline', 'Solusi Dinamo Motor & Gear Box Industri', 'Tagline website'),
  ('whatsapp_number', '628xxxxxxxxxx', 'Nomor WhatsApp resmi dalam format internasional tanpa tanda plus'),
  ('whatsapp_default_message', 'Halo Maju Berkah Teknik, saya ingin bertanya mengenai produk dinamo motor / gear box. Mohon dibantu untuk rekomendasi spesifikasi yang sesuai.', 'Pesan default WhatsApp'),
  ('company_address', 'Pondok Mutiara Blok AA no 6 Sidoarjo', 'Alamat perusahaan'),
  ('company_email', 'mbtekniksidoarjo@gmail.com', 'Email perusahaan'),
  ('site_url', 'https://www.mbdinamo.com', 'URL website setelah deploy')
on conflict (key) do update set
  value = excluded.value,
  description = excluded.description;
