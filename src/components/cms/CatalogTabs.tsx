import Link from 'next/link';

const tabs = [
  { href: '/cms/products', label: 'Produk', value: 'products' },
  { href: '/cms/categories', label: 'Kategori', value: 'categories' },
  { href: '/cms/brands', label: 'Brand', value: 'brands' },
] as const;

type CatalogTab = (typeof tabs)[number]['value'];

export function CatalogTabs({ active }: { active: CatalogTab }) {
  return (
    <div className="mb-6 rounded-3xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
      <div className="grid gap-2 sm:grid-cols-3" role="tablist" aria-label="Navigasi katalog CMS">
        {tabs.map((tab) => {
          const isActive = tab.value === active;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              role="tab"
              aria-selected={isActive}
              className={
                isActive
                  ? 'rounded-2xl bg-slate-950 px-5 py-3 text-center text-sm font-black text-white shadow-sm'
                  : 'rounded-2xl px-5 py-3 text-center text-sm font-black text-slate-600 transition hover:bg-slate-100 hover:text-slate-950'
              }
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
