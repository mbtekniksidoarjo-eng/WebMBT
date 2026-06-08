import { deleteSetting, upsertSetting } from '@/app/cms/actions';
import { CmsLayout } from '@/components/cms/CmsLayout';
import { DeleteButton, SubmitButton, TextArea, TextInput } from '@/components/cms/Fields';
import { fetchAdminTable } from '@/lib/cms-admin-data';

export const dynamic = 'force-dynamic';

type Setting = { id: string; key: string; value: string | null; description: string | null };

export default async function SettingsPage() {
  const { data, error } = await fetchAdminTable('settings', 'key');
  const settings = data as Setting[];
  return (
    <CmsLayout title="Settings" description="Create, update, delete setting website.">
      {error ? <Alert text={error} /> : null}
      <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h2 className="text-lg font-black text-slate-950">Tambah Setting</h2><SettingForm /></section>
      <div className="mt-8 space-y-4">{settings.map((setting) => <SettingCard key={setting.id} setting={setting} />)}</div>
    </CmsLayout>
  );
}

function SettingForm({ setting }: { setting?: Setting }) {
  return (
    <form action={upsertSetting} className="mt-5 grid gap-4 lg:grid-cols-2">
      <input type="hidden" name="id" defaultValue={setting?.id || ''} />
      <TextInput label="Key" name="key" defaultValue={setting?.key} required />
      <TextInput label="Value" name="value" defaultValue={setting?.value} />
      <div className="lg:col-span-2"><TextArea label="Deskripsi" name="description" defaultValue={setting?.description} /></div>
      <div><SubmitButton>{setting ? 'Update Setting' : 'Tambah Setting'}</SubmitButton></div>
    </form>
  );
}

function SettingCard({ setting }: { setting: Setting }) {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="mb-4 flex items-center justify-between gap-4"><div><h3 className="font-black text-slate-950">{setting.key}</h3><p className="text-sm text-slate-500">{setting.value}</p></div><form action={deleteSetting}><input type="hidden" name="id" value={setting.id} /><DeleteButton /></form></div>
      <SettingForm setting={setting} />
    </section>
  );
}

function Alert({ text }: { text: string }) { return <div className="mb-6 rounded-3xl bg-red-50 p-4 text-sm font-bold text-red-600">{text}</div>; }
