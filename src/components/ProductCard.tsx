import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import type { Product } from '@/types/product';
import { whatsappLink } from '@/lib/whatsapp';

export function ProductCard({ product }: { product: Product }) {
  const waMessage = `Halo Maju Berkah Teknik, saya ingin bertanya tentang ${product.name}. Mohon info spesifikasi dan penawarannya.`;

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
        <Image src={product.image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" />
        <span className="absolute left-4 top-4 rounded-full bg-slate-950/85 px-3 py-1 text-xs font-bold text-white backdrop-blur">{product.category}</span>
      </div>
      <div className="p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{product.brand}</p>
          {product.gearboxType ? <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-600">{product.gearboxType}</span> : null}
        </div>
        <h3 className="text-lg font-extrabold tracking-tight text-slate-950">{product.name}</h3>
        <p className="mt-2 min-h-12 text-sm leading-6 text-slate-600">{product.description}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 text-sm">
          {product.rpm ? <Spec label="RPM" value={product.rpm} /> : null}
          {product.capacityKw ? <Spec label="Kapasitas" value={product.capacityKw} /> : null}
          {product.mountingType ? <Spec label="Mounting" value={product.mountingType} /> : null}
          {product.gearboxSize ? <Spec label="Size" value={product.gearboxSize} /> : null}
          {product.gearboxRatio ? <Spec label="Ratio" value={product.gearboxRatio} /> : null}
          {product.gearboxOutput ? <Spec label="Output" value={product.gearboxOutput} /> : null}
        </dl>

        <a href={whatsappLink(waMessage)} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500">
          <MessageCircle size={17} /> Tanya Produk Ini
        </a>
      </div>
    </article>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-slate-50 p-3">
      <dt className="text-xs font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 font-bold text-slate-900">{value}</dd>
    </div>
  );
}
