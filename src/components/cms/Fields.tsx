export function TextInput({ label, name, defaultValue, required, type = 'text' }: { label: string; name: string; defaultValue?: string | number | null; required?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input name={name} type={type} required={required} defaultValue={defaultValue ?? ''} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500" />
    </label>
  );
}

export function TextArea({ label, name, defaultValue, rows = 3 }: { label: string; name: string; defaultValue?: string | null; rows?: number }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <textarea name={name} defaultValue={defaultValue ?? ''} rows={rows} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500" />
    </label>
  );
}

export function SelectInput({ label, name, defaultValue, children }: { label: string; name: string; defaultValue?: string | null; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <select name={name} defaultValue={defaultValue ?? ''} className="mt-2 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500">
        {children}
      </select>
    </label>
  );
}

export function CheckboxInput({ label, name, defaultChecked = true }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700">
      <input name={name} type="checkbox" defaultChecked={defaultChecked} className="h-4 w-4" />
      {label}
    </label>
  );
}

export function SubmitButton({ children = 'Simpan' }: { children?: React.ReactNode }) {
  return <button className="rounded-2xl bg-blue-600 px-5 py-3 text-sm font-black text-white hover:bg-blue-700">{children}</button>;
}

export function DeleteButton() {
  return <button className="rounded-xl bg-red-50 px-3 py-2 text-xs font-black text-red-600 hover:bg-red-100">Delete</button>;
}
