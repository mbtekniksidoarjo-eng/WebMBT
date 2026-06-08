import Link from 'next/link';
import { logoutCms } from '@/app/cms/actions';

const navItems = [
  { href: '/cms', label: 'Dashboard' },
  { href: '/cms/products', label: 'Produk' },
  { href: '/cms/categories', label: 'Kategori' },
  { href: '/cms/brands', label: 'Brand' },
  { href: '/cms/faqs', label: 'FAQ' },
  { href: '/cms/settings', label: 'Settings' },
];

export function CmsLayout({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-100">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 border-r border-slate-200 bg-white p-5 lg:block">
        <Link href="/" className="text-lg font-black text-slate-950">Maju Berkah Teknik</Link>
        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">CMS Admin</p>
        <nav className="mt-8 space-y-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-950 hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <form action={logoutCms} className="absolute bottom-5 left-5 right-5">
          <button className="w-full rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-100">Logout</button>
        </form>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
          <div className="flex flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <h1 className="text-2xl font-black tracking-tight text-slate-950">{title}</h1>
              {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
            </div>
            <div className="flex flex-wrap gap-2 lg:hidden">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-full bg-slate-950 px-3 py-2 text-xs font-bold text-white">{item.label}</Link>
              ))}
            </div>
          </div>
        </header>
        <section className="px-4 py-8 sm:px-6 lg:px-8">{children}</section>
      </div>
    </main>
  );
}
