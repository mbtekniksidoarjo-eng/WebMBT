import { deleteBrand, upsertBrand } from '@/app/cms/actions';
import { CmsLayout } from '@/components/cms/CmsLayout';
import { CheckboxInput, DeleteButton, SubmitButton, TextArea, TextInput } from '@/components/cms/Fields';
import { fetchAdminTable } from '@/lib/cms-admin-data';

export const dynamic = 'force-dynamic';

type Brand = { id: string; name: string; slug: string; logo_url: string | null; description: string | null; is_active: boolean };

export default async function BrandsPage() {
  const { data, error } = await fetchAdminTable('brands', 'name');
  const brands = data as Brand[];
  return (
    <CmsLayout title="Brand" description="Create, update, delete brand produk.">
      {error ? <Alert text={error} /> : null}
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h2 className="text-lg font-black text-slate-950">Tambah Brand</h2><BrandForm /></section>
      <div className="mt-8 space-y-4">{brands.map((brand) => <BrandCard key={brand.id} brand={brand} />)}</div>
    </CmsLayout>
  );
}

function BrandForm({ brand }: { brand?: Brand }) {
  return (
    <form action={upsertBrand} className="mt-5 grid gap-4 lg:grid-cols-2">
      <input type="hidden" name="id" defaultValue={brand?.id || ''} />
      <TextInput label="Nama" name="name" defaultValue={brand?.name} required />
      <TextInput label="Slug" name="slug" defaultValue={brand?.slug} />
      <TextInput label="Logo URL" name="logo_url" defaultValue={brand?.logo_url} />
      <CheckboxInput label="Aktif" name="is_active" defaultChecked={brand?.is_active ?? true} />
      <div className="lg:col-span-2"><TextArea label="Deskripsi" name="description" defaultValue={brand?.description} /></div>
      <div><SubmitButton>{brand ? 'Update Brand' : 'Tambah Brand'}</SubmitButton></div>
    </form>
  );
}

function BrandCard({ brand }: { brand: Brand }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between gap-4"><div><h3 className="font-black text-slate-950">{brand.name}</h3><p className="text-sm text-slate-500">{brand.slug}</p></div><form action={deleteBrand}><input type="hidden" name="id" value={brand.id} /><DeleteButton /></form></div>
      <BrandForm brand={brand} />
    </section>
  );
}

function Alert({ text }: { text: string }) { return <div className="mb-6 rounded-3xl bg-red-50 p-4 text-sm font-bold text-red-600">{text}</div>; }
