import Image from 'next/image';
import { Metadata } from 'next';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ProductCard } from '@/components/ProductCard';
import { fetchAllProducts, filterProducts } from '@/lib/catalog';
import { absoluteUrl, siteConfig } from '@/lib/site';
import { getCmsData } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Katalog Produk',
  description:
    'Katalog lengkap dinamo motor 1 phase, 3 phase, dan gear box industri merk Motology dan Alliance. Filter berdasarkan kategori, brand, dan spesifikasi.',
  alternates: { canonical: absoluteUrl('/produk') },
  openGraph: {
    title: 'Katalog Produk | Maju Berkah Teknik',
    description:
      'Katalog lengkap dinamo motor 1 phase, 3 phase, dan gear box industri merk Motology dan Alliance.',
    url: absoluteUrl('/produk'),
  },
};

export const dynamic = 'force-dynamic';

export default async function ProductsCatalogPage({ searchParams }: { searchParams: Promise<{ q?: string; kategori?: string; brand?: string; phase?: string; type?: string }> }) {
  const [cms, allProducts] = await Promise.all([getCmsData(), fetchAllProducts()]);
  const params = await searchParams;

  const categories = Array.from(new Set(allProducts.map((p) => p.category)));
  const brands = Array.from(new Set(allProducts.map((p) => p.brand)));
  const phases = Array.from(new Set(allProducts.map((p) => p.phase || '').filter((v) => v !== '')));
  const gearboxTypes = Array.from(new Set(allProducts.map((p) => p.gearboxType || '').filter((v) => v !== '')));

  const filtered = filterProducts(allProducts, {
    search: params.q,
    category: params.kategori,
    brand: params.brand,
    phase: params.phase,
    gearboxType: params.type,
  });

  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Katalog Produk</h1>
          <p className="mt-2 text-slate-600">Cari dinamo motor dan gear box sesuai kebutuhan.</p>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <form method="get" className="mb-6 space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  name="q"
                  type="search"
                  defaultValue={params.q || ''}
                  placeholder="Cari produk..."
                  className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none focus:border-blue-500"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white hover:bg-slate-800"
              >
                <SlidersHorizontal size={16} /> Cari
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              <FilterSelect name="kategori" label="Kategori" options={categories} defaultValue={params.kategori || ''} />
              <FilterSelect name="brand" label="Brand" options={brands} defaultValue={params.brand || ''} />
              <FilterSelect name="phase" label="Phase" options={phases} defaultValue={params.phase || ''} />
              <FilterSelect name="type" label="Gearbox" options={gearboxTypes} defaultValue={params.type || ''} />
            </div>
          </form>
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          {filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-8 text-center ring-1 ring-slate-200">
              <p className="text-lg font-bold text-slate-700">Produk tidak ditemukan.</p>
              <p className="mt-1 text-sm text-slate-500">Coba ubah filter atau kata kunci pencarian.</p>
            </div>
          )}
        </section>
      </main>
      <Footer settings={cms.settings} />
    </>
  );
}

function FilterSelect({
  name,
  label,
  options,
  defaultValue,
}: {
  name: string;
  label: string;
  options: string[];
  defaultValue: string;
}) {
  if (!options.length) return null;
  return (
    <div className="min-w-[9rem]">
      <label className="mb-1 block text-xs font-bold text-slate-500">{label}</label>
      <select
        name={name}
        defaultValue={defaultValue}
        className="w-full rounded-2xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
      >
        <option value="">Semua</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );
}
