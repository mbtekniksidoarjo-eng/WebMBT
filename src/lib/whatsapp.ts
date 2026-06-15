const DEFAULT_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+6285337625233';

export function whatsappLink(message: string, number = DEFAULT_NUMBER) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  `Halo Maju Berkah Teknik, saya ingin bertanya kebutuhan dinamo/gearbox.
Nama:
Lokasi:
Kebutuhan:
Daya/HP:
RPM:
1 phase / 3 phase:
Foto mesin jika ada:`;
