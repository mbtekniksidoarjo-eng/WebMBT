import Image from 'next/image';
import { Mail, MapPin, Phone, PhoneCall } from 'lucide-react';
import { getSetting, type CmsSetting } from '@/lib/cms';
import { defaultWhatsappMessage, whatsappLink } from '@/lib/whatsapp';

const defaultAddress = process.env.NEXT_PUBLIC_COMPANY_ADDRESS || 'Pondok Mutiara Blok AA no 6 Sidoarjo';
const defaultEmail = process.env.NEXT_PUBLIC_COMPANY_EMAIL || 'mbtekniksidoarjo@gmail.com';
const defaultPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+6285337625233';

export function Footer({ settings = [] }: { settings?: CmsSetting[] }) {
  const address = getSetting(settings, 'company_address', defaultAddress);
  const email = getSetting(settings, 'company_email', defaultEmail);
  const phone = getSetting(settings, 'company_phone', defaultPhone);

  return (
    <footer id="kontak" className="bg-slate-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <Image src="/images/logo.jpeg" alt="Logo Maju Berkah Teknik" width={52} height={52} className="rounded-xl object-cover" />
            <div>
              <p className="font-bold">Maju Berkah Teknik</p>
              <p className="text-sm text-slate-300">Dinamo Motor & Gear Box Industri</p>
            </div>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300">
            Supplier kebutuhan mekanikal industri untuk dinamo motor 1 phase, 3 phase, dan gear box. Siap membantu konsultasi spesifikasi melalui WhatsApp.
          </p>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Produk</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li>Dinamo Motor 3 Phase</li>
            <li>Dinamo Motor 1 Phase</li>
            <li>Gear Box WPA / WPX / WPO</li>
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-bold">Hubungi Kami</h3>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="flex gap-2"><MapPin size={17} className="mt-0.5 shrink-0" /> {address}</p>
            <p className="flex gap-2"><Phone size={17} className="mt-0.5 shrink-0" /> {phone}</p>
            <a href={`mailto:${email}`} className="flex gap-2 hover:text-white">
              <Mail size={17} className="mt-0.5 shrink-0" /> {email}
            </a>
            <a href={whatsappLink(defaultWhatsappMessage)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-3 font-bold text-white hover:bg-orange-600">
              <PhoneCall size={17} /> Konsultasi via WhatsApp
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} Maju Berkah Teknik. All rights reserved.
      </div>
    </footer>
  );
}
