import { Boxes, FileQuestion, Settings, Tags } from 'lucide-react';
import { CmsLayout } from '@/components/cms/CmsLayout';
import { getCmsData, getSetting } from '@/lib/cms';
import { requireCmsAuth } from '@/lib/cms-auth';

export const dynamic = 'force-dynamic';

export default async function CmsPage() {
  await requireCmsAuth();
  const cms = await getCmsData();
  const whatsapp = getSetting(cms.settings, 'whatsapp_number', '628xxxxxxxxxx');

  const stats = [
    { label: 'Kategori', value: cms.categories.length, icon: <Tags /> },
    { label: 'Produk tampil', value: cms.products.length, icon: <Boxes /> },
    { label: 'FAQ', value: cms.faqs.length, icon: <FileQuestion /> },
    { label: 'Setting', value: cms.settings.length, icon: <Settings /> },
  ];

  return (
    <CmsLayout title="Dashboard CMS" description="Kelola produk, kategori, brand, FAQ, dan setting website.">
      {cms.notice ? (
        <div className="mb-6 rounded-3xl bg-amber-50 p-5 text-sm font-semibold text-amber-800">
          {cms.notice} Isi `.env.local` agar CMS membaca Supabase.
        </div>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-4 inline-flex rounded-2xl bg-blue-50 p-3 text-blue-600">{stat.icon}</div>
            <p className="text-3xl font-black text-slate-950">{stat.value}</p>
            <p className="text-sm font-semibold text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black text-slate-950">Status</h2>
          <div className="mt-4 space-y-3 text-sm text-slate-700">
            <p><strong>Data source:</strong> {cms.source === 'supabase' ? 'Supabase aktif' : 'Fallback lokal'}</p>
            <p><strong>WhatsApp:</strong> {whatsapp}</p>
            <p><strong>CRUD:</strong> gunakan menu Produk, Kategori, Brand, FAQ, Settings.</p>
          </div>
        </section>
        <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-xl font-black text-slate-950">Environment wajib</h2>
          <div className="mt-4 space-y-2 rounded-2xl bg-slate-950 p-5 font-mono text-sm text-slate-100">
            <p>NEXT_PUBLIC_SUPABASE_URL=...</p>
            <p>NEXT_PUBLIC_SUPABASE_ANON_KEY=...</p>
            <p>SUPABASE_SERVICE_ROLE_KEY=...</p>
            <p>CMS_ADMIN_PASSWORD=...</p>
          </div>
        </section>
      </div>
    </CmsLayout>
  );
}
