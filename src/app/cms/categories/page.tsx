import { deleteCategory, upsertCategory } from '@/app/cms/actions';
import { CatalogTabs } from '@/components/cms/CatalogTabs';
import { CmsLayout } from '@/components/cms/CmsLayout';
import { CheckboxInput, DeleteButton, SubmitButton, TextArea, TextInput } from '@/components/cms/Fields';
import { fetchAdminTable } from '@/lib/cms-admin-data';

export const dynamic = 'force-dynamic';

type Category = { id: string; name: string; slug: string; description: string | null; image_url: string | null; sort_order: number; is_active: boolean };

export default async function CategoriesPage() {
  const { data, error } = await fetchAdminTable('categories');
  const categories = data as Category[];

  return (
    <CmsLayout title="Katalog" description="Kelola produk, kategori, dan brand dalam tab katalog.">
      <CatalogTabs active="categories" />
      {error ? <Alert text={error} /> : null}
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-black text-slate-950">Tambah Kategori</h2>
        <CategoryForm />
      </section>
      <div className="mt-8 space-y-4">
        {categories.map((category) => <CategoryCard key={category.id} category={category} />)}
      </div>
    </CmsLayout>
  );
}

function CategoryForm({ category }: { category?: Category }) {
  return (
    <form action={upsertCategory} className="mt-5 grid gap-4 lg:grid-cols-2">
      <input type="hidden" name="id" defaultValue={category?.id || ''} />
      <TextInput label="Nama" name="name" defaultValue={category?.name} required />
      <TextInput label="Slug" name="slug" defaultValue={category?.slug} />
      <TextInput label="Image URL" name="image_url" defaultValue={category?.image_url} />
      <TextInput label="Sort Order" name="sort_order" type="number" defaultValue={category?.sort_order ?? 0} />
      <div className="lg:col-span-2"><TextArea label="Deskripsi" name="description" defaultValue={category?.description} /></div>
      <CheckboxInput label="Aktif" name="is_active" defaultChecked={category?.is_active ?? true} />
      <div><SubmitButton>{category ? 'Update Kategori' : 'Tambah Kategori'}</SubmitButton></div>
    </form>
  );
}

function CategoryCard({ category }: { category: Category }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div><h3 className="font-black text-slate-950">{category.name}</h3><p className="text-sm text-slate-500">{category.slug}</p></div>
        <form action={deleteCategory}><input type="hidden" name="id" value={category.id} /><DeleteButton /></form>
      </div>
      <CategoryForm category={category} />
    </section>
  );
}

function Alert({ text }: { text: string }) { return <div className="mb-6 rounded-3xl bg-red-50 p-4 text-sm font-bold text-red-600">{text}</div>; }
