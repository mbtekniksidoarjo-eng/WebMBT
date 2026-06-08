import Image from 'next/image';
import Link from 'next/link';
import { PhoneCall } from 'lucide-react';
import { defaultWhatsappMessage, whatsappLink } from '@/lib/whatsapp';

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="#home" className="flex items-center gap-3">
          <Image src="/images/logo.jpeg" alt="Logo Maju Berkah Teknik" width={46} height={46} className="rounded-xl border border-slate-200 object-cover" />
          <div className="leading-tight">
            <p className="text-sm font-black text-slate-950 sm:text-base">Maju Berkah Teknik</p>
            <p className="text-xs font-semibold text-slate-500">Industrial Mechanical Supplier</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-bold text-slate-700 md:flex">
          <Link href="#produk" className="hover:text-orange-500">Produk</Link>
          <Link href="#spesifikasi" className="hover:text-orange-500">Spesifikasi</Link>
          <Link href="#tentang" className="hover:text-orange-500">Tentang</Link>
          <Link href="#faq" className="hover:text-orange-500">FAQ</Link>
        </nav>

        <a href={whatsappLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600">
          <PhoneCall size={16} />
          <span className="hidden sm:inline">WhatsApp</span>
        </a>
      </div>
    </header>
  );
}
