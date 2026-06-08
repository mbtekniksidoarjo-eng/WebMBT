import Link from 'next/link';
import { loginCms } from '@/app/cms/actions';

export default async function CmsLoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
      <div className="w-full max-w-md rounded-[2rem] bg-white p-8 shadow-2xl">
        <Link href="/" className="text-sm font-bold text-blue-600">← Landing Page</Link>
        <h1 className="mt-6 text-3xl font-black text-slate-950">Login CMS</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">Masuk untuk create, update, dan delete data CMS Maju Berkah Teknik.</p>
        {params.error ? <div className="mt-5 rounded-2xl bg-red-50 p-4 text-sm font-bold text-red-600">Password salah atau CMS_ADMIN_PASSWORD belum diset.</div> : null}
        <form action={loginCms} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-sm font-bold text-slate-700">Password Admin</span>
            <input type="password" name="password" required className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-blue-500" />
          </label>
          <button className="w-full rounded-2xl bg-blue-600 px-5 py-4 font-black text-white hover:bg-blue-700">Login</button>
        </form>
      </div>
    </main>
  );
}
