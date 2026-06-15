import Image from 'next/image';
import { ArrowRight, BadgeCheck, Boxes, Download, Factory, Filter, Gauge, MessageCircle, PhoneCall, ShieldCheck, SlidersHorizontal, Wrench } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { getCmsData, getContent, getSetting } from '@/lib/cms';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { defaultWhatsappMessage, whatsappLink } from '@/lib/whatsapp';

export default async function Home() {
  const cms = await getCmsData();
  const heroContent = getContent(cms.contents, 'hero');
  const aboutContent = getContent(cms.contents, 'about');
  const ctaMessage = defaultWhatsappMessage;
  const companyAddress = getSetting(cms.settings, 'company_address', siteConfig.address);
  const companyEmail = getSetting(cms.settings, 'company_email', siteConfig.email);
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': absoluteUrl('/#organization'),
        name: siteConfig.name,
        url: siteConfig.url,
        logo: absoluteUrl(siteConfig.logo),
        email: companyEmail,
        address: {
          '@type': 'PostalAddress',
          streetAddress: companyAddress,
          addressLocality: 'Sidoarjo',
          addressRegion: 'Jawa Timur',
          addressCountry: 'ID',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: siteConfig.phone,
          email: companyEmail,
          areaServed: 'ID',
          availableLanguage: ['id'],
        },
      },
      {
        '@type': 'WebSite',
        '@id': absoluteUrl('/#website'),
        url: siteConfig.url,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { '@id': absoluteUrl('/#organization') },
        inLanguage: 'id-ID',
      },
      {
        '@type': 'FAQPage',
        '@id': absoluteUrl('/#faq'),
        mainEntity: cms.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
      />
      <Header />
      {cms.notice ? (
        <div className="bg-amber-50 px-4 py-3 text-center text-sm font-semibold text-amber-800">
          Mode fallback: {cms.notice}
        </div>
      ) : null}

      <section id="home" className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 text-slate-950">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.05)_1px,transparent_1px)] bg-[size:42px_42px]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
          <div className="relative z-10">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-black text-blue-700 shadow-sm">
              <ShieldCheck size={17} /> Supplier Mekanikal Industri
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {heroContent?.title || <>Solusi <span className="text-orange-500">Dinamo Motor</span> & Gear Box Industri Terpercaya</>}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium leading-8 text-slate-600">
              {heroContent?.subtitle || 'Maju Berkah Teknik menyediakan dinamo motor 1 phase, 3 phase, dan gear box berkualitas untuk kebutuhan industri, workshop, produksi, dan maintenance.'}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappLink(ctaMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-4 font-extrabold text-white shadow-xl shadow-orange-500/25 transition hover:bg-orange-600">
                <PhoneCall size={19} /> Minta Penawaran via WhatsApp
              </a>
              <a href="#produk" className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-4 font-bold text-slate-950 shadow-sm transition hover:border-blue-200 hover:bg-blue-50">
                Lihat Katalog Produk <ArrowRight size={18} />
              </a>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-2 gap-4 sm:grid-cols-4">
              {['Motology', 'Alliance', '1 & 3 Phase', 'WPA WPX WPO'].map((item) => (
                <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4 text-center text-sm font-black text-slate-800 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10">
            <div className="rounded-[2rem] border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-200/70">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-slate-900">
                <Image src={heroContent?.image_url || '/images/products/3_Phase_Foot_Mounted_B3/1.jpeg'} alt="Dinamo motor industri Maju Berkah Teknik" fill priority fetchPriority="high" className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" />
              </div>
              <div className="grid gap-4 p-4 sm:grid-cols-3">
                <HeroStat value="0,18–315 KW" label="Kapasitas 3 phase" />
                <HeroStat value="3000–750" label="Pilihan RPM" />
                <HeroStat value="50–250" label="Size gearbox" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white py-8">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
          <TrustItem icon={<BadgeCheck />} title="Produk Lengkap" text="Dinamo 1 phase, 3 phase, dan gear box." />
          <TrustItem icon={<Wrench />} title="Konsultasi Teknis" text="Bantu pilih spesifikasi sesuai kebutuhan mesin." />
          <TrustItem icon={<MessageCircle />} title="Respon WhatsApp" text="Tanya produk dan minta penawaran lebih cepat." />
          <TrustItem icon={<Factory />} title="Untuk Industri" text="Cocok untuk pabrik, workshop, dan maintenance." />
        </div>
      </section>

      <section id="produk" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Produk Kami" title="Katalog utama Maju Berkah Teknik" description="Disusun agar calon pelanggan cepat memahami kategori produk, spesifikasi, dan langsung bertanya melalui WhatsApp." />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cms.categories.map((category) => (
            <article key={category.title} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image src={category.image} alt={`${category.title} Maju Berkah Teknik`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-black text-slate-950">{category.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
                <ul className="mt-5 space-y-2">
                  {category.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2 text-sm font-semibold text-slate-700"><BadgeCheck size={16} className="text-blue-600" /> {spec}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="katalog" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 p-8 text-white shadow-xl sm:p-12">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.3em] text-blue-200">Download Katalog</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Katalog Lengkap Maju Berkah Teknik</h2>
              <p className="mt-4 max-w-xl text-base leading-8 text-blue-100">
                Lihat seluruh produk dinamo motor &amp; gear box dalam satu file. Unduh katalog PDF lengkap dengan spesifikasi dan harga terkini.
              </p>
            </div>
            <a
              href="/catalog/katalog-mbt.jpeg"
              download
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-extrabold text-blue-700 shadow-lg transition hover:bg-blue-50">
              <Download size={20} /> Download Katalog
            </a>
          </div>
        </div>
      </section>

      <section id="spesifikasi" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Produk Unggulan" title="Produk siap ditanyakan langsung ke WhatsApp" description="Card produk memakai foto asli dari folder Image, dengan informasi teknis ringkas agar mudah dibaca." />
          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {cms.products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading align="left" eyebrow="Filter Katalog" title="Telusuri produk sesuai kebutuhan" description="Pilih kategori produk dan temukan spesifikasi dinamo motor serta gear box yang sesuai untuk mesin Anda." />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cms.categories.map((cat) => (
                <a
                  key={cat.title}
                  href="/produk"
                  className="flex items-center gap-3 rounded-2xl bg-white p-4 font-bold text-slate-900 shadow-sm ring-1 ring-slate-200 transition hover:ring-blue-300 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                    <Filter size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-black">{cat.title}</p>
                    <p className="truncate text-xs text-slate-500">{cat.specs.slice(0, 2).join(' · ')}</p>
                  </div>
                </a>
              ))}
              <a
                href="/produk"
                className="flex items-center gap-3 rounded-2xl bg-slate-950 p-4 font-bold text-white shadow-sm transition hover:bg-slate-800"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <Boxes size={18} />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black">Semua Produk</p>
                  <p className="truncate text-xs text-slate-400">Lihat katalog lengkap di halaman produk</p>
                </div>
              </a>
            </div>
          </div>
          <div className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-xl">
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">Spesifikasi Utama</p>
            <div className="mt-6 grid gap-4">
              <SpecBlock title="Dinamo Motor 3 Phase" items={['Merk: Motology, Alliance', 'RPM: 3000, 1500, 1000, 750', 'Kapasitas: 0,18 KW – 315 KW / 0,25 HP – 410 HP', 'Mounting: B3 (Foot), B5 (Flange), B35 (Foot+Flange)']} />
              <SpecBlock title="Dinamo Motor 1 Phase" items={['Merk: Motology, Alliance', 'RPM: 3000, 1500', 'Kapasitas: 0,18 KW – 4 KW / 0,25 HP – 5 HP', 'Mounting: B3 (Foot), B5 (Flange), B35 (Foot+Flange)']} />
              <SpecBlock title="Gear Box" items={['Merk: Motology, Alliance', 'Size: 50, 60, 70, 80, 100, 120, 135, 155, 175, 200, 250', 'Ratio: 10, 20, 30, 40, 50, 60', 'Tipe: WPA (output samping), WPX (output bawah), WPO (output atas)']} />
            </div>
          </div>
        </div>
      </section>

      <section id="tentang" className="bg-slate-950 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-orange-400">Tentang Kami</p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">{aboutContent?.title || 'Partner kebutuhan dinamo motor dan gear box industri'}</h2>
          </div>
          <div className="text-base leading-8 text-slate-300">
            <p>
              {aboutContent?.content || 'Maju Berkah Teknik membantu pelanggan menemukan produk mekanikal industri sesuai kebutuhan teknis. Fokus utama website ini adalah membuat calon pembeli cepat memahami kategori produk, spesifikasi penting, dan langsung terhubung dengan tim melalui WhatsApp.'}
            </p>
            <a href={whatsappLink(ctaMessage)} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-4 font-extrabold text-white hover:bg-orange-600">
              Konsultasi Sekarang <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="FAQ" title="Pertanyaan yang sering diajukan" description="Informasi ringkas untuk mempercepat calon pelanggan sebelum menghubungi WhatsApp." />
        <div className="mt-10 space-y-4">
          {cms.faqs.map((faq) => <Faq key={faq.id || faq.question} q={faq.question} a={faq.answer} />)}
        </div>
      </section>

      <a href={whatsappLink(ctaMessage)} target="_blank" rel="noreferrer" aria-label="Hubungi Maju Berkah Teknik via WhatsApp" className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-green-500 px-5 py-4 text-sm font-black text-white shadow-2xl shadow-green-500/30 transition hover:bg-green-600">
        <MessageCircle size={20} /> WhatsApp
      </a>

      <Footer settings={cms.settings} />
    </main>
  );
}

function HeroStat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-2xl bg-slate-50 p-4 text-center ring-1 ring-slate-200"><p className="font-black text-orange-500">{value}</p><p className="mt-1 text-xs font-semibold text-slate-500">{label}</p></div>;
}

function TrustItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <div className="flex gap-3 rounded-2xl bg-slate-50 p-4"><div className="text-blue-600">{icon}</div><div><h3 className="font-bold text-slate-950">{title}</h3><p className="mt-1 text-sm text-slate-600">{text}</p></div></div>;
}

function SectionHeading({ eyebrow, title, description, align = 'center' }: { eyebrow: string; title: string; description: string; align?: 'center' | 'left' }) {
  return <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}><p className="text-sm font-black uppercase tracking-[0.3em] text-blue-600">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2><p className="mt-4 text-base leading-8 text-slate-600">{description}</p></div>;
}

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return <div className="flex items-center gap-3 rounded-2xl bg-white p-4 font-bold text-slate-900 shadow-sm ring-1 ring-slate-200"><span className="text-orange-500">{icon}</span>{title}</div>;
}

function SpecBlock({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-3xl border border-white/10 bg-white/5 p-5"><h3 className="font-black text-white">{title}</h3><ul className="mt-3 space-y-2 text-sm text-slate-300">{items.map((item) => <li key={item} className="flex gap-2"><BadgeCheck size={16} className="mt-0.5 shrink-0 text-orange-400" />{item}</li>)}</ul></div>;
}

function Faq({ q, a }: { q: string; a: string }) {
  return <details className="group rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><summary className="cursor-pointer list-none font-black text-slate-950">{q}</summary><p className="mt-4 leading-7 text-slate-600">{a}</p></details>;
}
