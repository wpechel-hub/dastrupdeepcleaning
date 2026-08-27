import { SERVICE_TYPES, FREQUENCIES } from "@/lib/options";
import { createContractAction } from "./actions";

export default async function NewContractPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div className="max-w-2xl">
      <h1 className="text-xl font-semibold text-[#1b1f27] mb-6">New Contract</h1>

      {error && (
        <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          Please fill in all required fields.
        </div>
      )}

      <form action={createContractAction} className="bg-white border border-[#e2e6ec] rounded-xl p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Field label="Client Name" name="clientName" required placeholder="e.g. Arcadia Apartment Homes" />
          <Field label="Client Phone" name="clientPhone" />
        </div>
        <Field label="Client Email" name="clientEmail" type="email" hint="Required to send the sign link automatically." />
        <Field label="Service Address" name="serviceAddress" required placeholder="Street, City, State ZIP" />

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#5a6472] mb-1">Service Type</label>
            <select name="serviceType" required className={selectClass}>
              <option value="">Select…</option>
              {SERVICE_TYPES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5a6472] mb-1">Frequency</label>
            <select name="frequency" required className={selectClass}>
              <option value="">Select…</option>
              {FREQUENCIES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Effective Date" name="startDate" type="date" />
          <Field label="Monthly Fee" name="rate" placeholder="e.g. $3,240.00" required />
        </div>

        <div className="border-t border-[#e2e6ec] pt-4 mt-2">
          <p className="text-xs font-semibold text-[#5a6472] mb-3">
            Billing contact <span className="font-normal">(optional — defaults to the client name/email/phone above)</span>
          </p>
          <div className="grid grid-cols-3 gap-4">
            <Field label="Billing Contact" name="billingContact" />
            <Field label="Billing Email" name="billingEmail" type="email" />
            <Field label="Billing Phone" name="billingPhone" />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1B4B7A] hover:bg-[#2E6BA6] text-white text-sm font-semibold rounded-lg py-2.5 transition-colors mt-2"
        >
          Create &amp; Send Contract
        </button>
      </form>
    </div>
  );
}

const selectClass =
  "w-full border border-[#e2e6ec] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2E6BA6]/30 focus:border-[#2E6BA6]";
const inputClass = selectClass;

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  hint,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#5a6472] mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input type={type} name={name} required={required} placeholder={placeholder} className={inputClass} />
      {hint && <p className="text-[11px] text-[#5a6472] mt-1">{hint}</p>}
    </div>
  );
}
