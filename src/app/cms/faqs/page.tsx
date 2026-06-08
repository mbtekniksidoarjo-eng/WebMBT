import { deleteFaq, upsertFaq } from '@/app/cms/actions';
import { CmsLayout } from '@/components/cms/CmsLayout';
import { CheckboxInput, DeleteButton, SubmitButton, TextArea, TextInput } from '@/components/cms/Fields';
import { fetchAdminTable } from '@/lib/cms-admin-data';

export const dynamic = 'force-dynamic';

type Faq = { id: string; question: string; answer: string; sort_order: number; is_active: boolean };

export default async function FaqsPage() {
  const { data, error } = await fetchAdminTable('faqs');
  const faqs = data as Faq[];
  return (
    <CmsLayout title="FAQ" description="Create, update, delete pertanyaan FAQ.">
      {error ? <Alert text={error} /> : null}
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h2 className="text-lg font-black text-slate-950">Tambah FAQ</h2><FaqForm /></section>
      <div className="mt-8 space-y-4">{faqs.map((faq) => <FaqCard key={faq.id} faq={faq} />)}</div>
    </CmsLayout>
  );
}

function FaqForm({ faq }: { faq?: Faq }) {
  return (
    <form action={upsertFaq} className="mt-5 grid gap-4 lg:grid-cols-2">
      <input type="hidden" name="id" defaultValue={faq?.id || ''} />
      <div className="lg:col-span-2"><TextInput label="Pertanyaan" name="question" defaultValue={faq?.question} required /></div>
      <div className="lg:col-span-2"><TextArea label="Jawaban" name="answer" defaultValue={faq?.answer} rows={4} /></div>
      <TextInput label="Sort Order" name="sort_order" type="number" defaultValue={faq?.sort_order ?? 0} />
      <CheckboxInput label="Aktif" name="is_active" defaultChecked={faq?.is_active ?? true} />
      <div><SubmitButton>{faq ? 'Update FAQ' : 'Tambah FAQ'}</SubmitButton></div>
    </form>
  );
}

function FaqCard({ faq }: { faq: Faq }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between gap-4"><div><h3 className="font-black text-slate-950">{faq.question}</h3></div><form action={deleteFaq}><input type="hidden" name="id" value={faq.id} /><DeleteButton /></form></div>
      <FaqForm faq={faq} />
    </section>
  );
}

function Alert({ text }: { text: string }) { return <div className="mb-6 rounded-3xl bg-red-50 p-4 text-sm font-bold text-red-600">{text}</div>; }
