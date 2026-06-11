import { deleteProduct, upsertProduct } from '@/app/cms/actions';
import { CatalogTabs } from '@/components/cms/CatalogTabs';
import { CmsLayout } from '@/components/cms/CmsLayout';
import { CheckboxInput, DeleteButton, SelectInput, SubmitButton, TextArea, TextInput } from '@/components/cms/Fields';
import { fetchProductAdminData } from '@/lib/cms-admin-data';

export const dynamic = 'force-dynamic';

type Category = { id: string; name: string };
type Brand = { id: string; name: string };
type Product = {
  id: string;
  category_id: string | null;
  brand_id: string | null;
  name: string;
  slug: string;
  sku: string | null;
  short_description: string | null;
  description: string | null;
  image_url: string | null;
  phase: string | null;
  rpm: number | null;
  capacity_kw: number | null;
  capacity_hp: number | null;
  mounting_type: string | null;
  mounting_label: string | null;
  gearbox_size: number | null;
  gearbox_ratio: number | null;
  gearbox_type: string | null;
  gearbox_output: string | null;
  price: number | null;
  price_note: string | null;
  stock_status: string;
  is_featured: boolean;
  is_active: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  categories?: { name: string } | null;
  brands?: { name: string } | null;
};

export default async function ProductsPage() {
  const { products, categories, brands, error } = await fetchProductAdminData();
  return (
    <CmsLayout title="Katalog" description="Kelola produk, kategori, dan brand dalam tab katalog.">
      <CatalogTabs active="products" />
      {error ? <Alert text={error} /> : null}
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-lg font-black text-slate-950">Tambah Produk</h2>
        <ProductForm categories={categories as Category[]} brands={brands as Brand[]} />
      </section>
      <div className="mt-8 space-y-5">
        {(products as Product[]).map((product) => (
          <ProductCard key={product.id} product={product} categories={categories as Category[]} brands={brands as Brand[]} />
        ))}
      </div>
    </CmsLayout>
  );
}

function ProductForm({ product, categories, brands }: { product?: Product; categories: Category[]; brands: Brand[] }) {
  return (
    <form action={upsertProduct} className="mt-5 grid gap-4 lg:grid-cols-3">
      <input type="hidden" name="id" defaultValue={product?.id || ''} />
      <div className="lg:col-span-2"><TextInput label="Nama Produk" name="name" defaultValue={product?.name} required /></div>
      <TextInput label="Slug" name="slug" defaultValue={product?.slug} />
      <SelectInput label="Kategori" name="category_id" defaultValue={product?.category_id || ''}>
        <option value="">Pilih kategori</option>
        {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
      </SelectInput>
      <SelectInput label="Brand" name="brand_id" defaultValue={product?.brand_id || ''}>
        <option value="">Pilih brand</option>
        {brands.map((brand) => <option key={brand.id} value={brand.id}>{brand.name}</option>)}
      </SelectInput>
      <TextInput label="SKU" name="sku" defaultValue={product?.sku} />
      <div className="lg:col-span-3"><TextArea label="Deskripsi Singkat" name="short_description" defaultValue={product?.short_description} /></div>
      <div className="lg:col-span-3"><TextArea label="Deskripsi Panjang" name="description" defaultValue={product?.description} rows={4} /></div>
      <div className="lg:col-span-3"><TextInput label="Image URL" name="image_url" defaultValue={product?.image_url} /></div>

      <SelectInput label="Phase" name="phase" defaultValue={product?.phase || ''}>
        <option value="">Bukan dinamo</option>
        <option value="1 Phase">1 Phase</option>
        <option value="3 Phase">3 Phase</option>
      </SelectInput>
      <TextInput label="RPM" name="rpm" type="number" defaultValue={product?.rpm} />
      <TextInput label="Capacity KW" name="capacity_kw" type="number" defaultValue={product?.capacity_kw} />
      <TextInput label="Capacity HP" name="capacity_hp" type="number" defaultValue={product?.capacity_hp} />
      <SelectInput label="Mounting Type" name="mounting_type" defaultValue={product?.mounting_type || ''}>
        <option value="">-</option>
        <option value="B3">B3</option>
        <option value="B5">B5</option>
        <option value="B35">B35</option>
      </SelectInput>
      <TextInput label="Mounting Label" name="mounting_label" defaultValue={product?.mounting_label} />

      <TextInput label="Gearbox Size" name="gearbox_size" type="number" defaultValue={product?.gearbox_size} />
      <TextInput label="Gearbox Ratio" name="gearbox_ratio" type="number" defaultValue={product?.gearbox_ratio} />
      <SelectInput label="Gearbox Type" name="gearbox_type" defaultValue={product?.gearbox_type || ''}>
        <option value="">Bukan gear box</option>
        <option value="WPA">WPA</option>
        <option value="WPX">WPX</option>
        <option value="WPO">WPO</option>
      </SelectInput>
      <TextInput label="Gearbox Output" name="gearbox_output" defaultValue={product?.gearbox_output} />
      <TextInput label="Harga" name="price" type="number" defaultValue={product?.price} />
      <TextInput label="Catatan Harga" name="price_note" defaultValue={product?.price_note || 'Hubungi kami untuk penawaran harga'} />
      <SelectInput label="Stock Status" name="stock_status" defaultValue={product?.stock_status || 'available'}>
        <option value="available">Available</option>
        <option value="preorder">Preorder</option>
        <option value="out_of_stock">Out of stock</option>
      </SelectInput>
      <TextInput label="Sort Order" name="sort_order" type="number" defaultValue={product?.sort_order ?? 0} />
      <div className="lg:col-span-3"><TextInput label="SEO Title" name="seo_title" defaultValue={product?.seo_title} /></div>
      <div className="lg:col-span-3"><TextArea label="SEO Description" name="seo_description" defaultValue={product?.seo_description} /></div>
      <CheckboxInput label="Featured" name="is_featured" defaultChecked={product?.is_featured ?? false} />
      <CheckboxInput label="Aktif" name="is_active" defaultChecked={product?.is_active ?? true} />
      <div><SubmitButton>{product ? 'Update Produk' : 'Tambah Produk'}</SubmitButton></div>
    </form>
  );
}

function ProductCard({ product, categories, brands }: { product: Product; categories: Category[]; brands: Brand[] }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-black text-slate-950">{product.name}</h3>
          <p className="mt-1 text-sm text-slate-500">{product.categories?.name || '-'} · {product.brands?.name || '-'} · {product.slug}</p>
        </div>
        <form action={deleteProduct}><input type="hidden" name="id" value={product.id} /><DeleteButton /></form>
      </div>
      <ProductForm product={product} categories={categories} brands={brands} />
    </section>
  );
}

function Alert({ text }: { text: string }) { return <div className="mb-6 rounded-3xl bg-red-50 p-4 text-sm font-bold text-red-600">{text}</div>; }
