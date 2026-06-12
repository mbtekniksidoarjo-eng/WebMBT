import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { getCmsData } from '@/lib/cms';
import { absoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Kategori Produk',
  description: 'Jelajahi kategori dinamo motor 3 phase, 1 phase, dan gear box industri dari Maju Berkah Teknik.',
  alternates: { canonical: absoluteUrl('/kategori') },
};

export const dynamic = 'force-dynamic';

export default async function KategoriPage() {
  const cms = await getCmsData();
  return (
    <>
      <Header />
      <main className="min-h-screen bg-slate-50">
        <section className="mx-auto max-w-7xl px-4 pt-8 pb-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Kategori Produk</h1>
          <p className="mt-2 text-slate-600">Pilih kategori produk sesuai kebutuhan industri Anda.</p>
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {cms.categories.map((category) => (
              <article key={category.title} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl">
                <div className="relative aspect-[4/3] bg-slate-100">
                  <Image src={category.image} alt={category.title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-black text-slate-950">{category.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{category.description}</p>
                  <ul className="mt-5 space-y-2">
                    {category.specs.map((spec) => (
                      <li key={spec} className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> {spec}
                      </li>
                    ))}
                  </ul>
                  <Link href="/produk" className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-black text-white transition hover:bg-slate-800">
                    Lihat Produk
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer settings={cms.settings} />
    </>
  );
}
