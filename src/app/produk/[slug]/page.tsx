import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { fetchAllProducts, fetchProductBySlug, generateWhatsAppForProduct } from '@/lib/catalog';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { getCmsData } from '@/lib/cms';
import { whatsappLink } from '@/lib/whatsapp';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export async function generateStaticParams() {
  const products = await fetchAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: absoluteUrl(`/produk/${slug}`) },
    openGraph: {
      title: `${product.name} | Maju Berkah Teknik`,
      description: product.description,
      url: absoluteUrl(`/produk/${slug}`),
      images: product.image ? [{ url: absoluteUrl(product.image) }] : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [cms, product, allProducts] = await Promise.all([getCmsData(), fetchProductBySlug(slug), fetchAllProducts()]);

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <h1 className="text-2xl font-black text-slate-950">Produk tidak ditemukan</h1>
            <Link href="/produk" className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800">
              <ArrowLeft size={16} /> Kembali ke Katalog
            </Link>
          </div>
        </main>
        <Footer settings={cms.settings} />
      </>
    );
  }

  const waMessage = generateWhatsAppForProduct(product);
  const related = allProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: absoluteUrl(product.image),
    description: product.description,
    brand: { '@type': 'Brand', name: product.brand },
    category: product.category,
    ...(product.rpm && { additionalProperty: [{ '@type': 'PropertyValue', name: 'RPM', value: product.rpm }] }),
    ...(product.capacityKw && { additionalProperty: [{ '@type': 'PropertyValue', name: 'Kapasitas', value: product.capacityKw }] }),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'IDR',
      url: absoluteUrl(`/produk/${slug}`),
      seller: {
        '@type': 'Organization',
        name: siteConfig.name,
        url: siteConfig.url,
      },
    },
  };

  const fields: { label: string; value?: string }[] = [
    { label: 'Kategori', value: product.category },
    { label: 'Brand', value: product.brand },
    { label: 'Phase', value: product.phase },
    { label: 'RPM', value: product.rpm },
    { label: 'Kapasitas (KW)', value: product.capacityKw },
    { label: 'Kapasitas (HP)', value: product.capacityHp },
    { label: 'Mounting', value: product.mountingType },
    { label: 'Gearbox Size', value: product.gearboxSize },
    { label: 'Gearbox Ratio', value: product.gearboxRatio },
    { label: 'Gearbox Type', value: product.gearboxType },
    { label: 'Gearbox Output', value: product.gearboxOutput },
  ].filter((f) => f.value);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
        <section className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">
          <Link href="/produk" className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-950">
            <ArrowLeft size={16} /> Kembali ke Katalog
          </Link>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-[2rem] bg-white ring-1 ring-slate-200">
              <Image src={product.image} alt={product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" priority />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{product.brand}</p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{product.name}</h1>
              <p className="mt-4 text-base leading-8 text-slate-600">{product.description}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {fields.map((f) => (
                  <div key={f.label} className="rounded-2xl bg-white p-4 ring-1 ring-slate-200">
                    <p className="text-xs font-semibold text-slate-500">{f.label}</p>
                    <p className="mt-1 font-bold text-slate-950">{f.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-green-500 px-6 py-4 font-extrabold text-white shadow-xl shadow-green-500/20 transition hover:bg-green-600">
                  <MessageCircle size={18} /> Tanya Produk via WhatsApp
                </a>
                <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-4 font-bold text-slate-950 shadow-sm transition hover:bg-slate-50">
                  Minta Penawaran Harga
                </a>
              </div>
            </div>
          </div>
        </section>

        {related.length > 0 && (
          <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-xl font-black text-slate-950">Produk Lain dalam Kategori {product.category}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {related.map((p) => (
                <Link key={p.id} href={`/produk/${p.slug}`} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[4/3] bg-slate-100">
                    <Image src={p.image} alt={p.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{p.brand}</p>
                    <h3 className="mt-1 font-extrabold text-slate-950">{p.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer settings={cms.settings} />
    </>
  );
}
