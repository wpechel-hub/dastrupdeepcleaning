"use client";

import { useState } from "react";
import { SERVICE_TYPES, FREQUENCIES } from "@/lib/options";
import { buildDefaultClauses } from "@/lib/contract-defaults";
import { createContractAction } from "./actions";

type ExistingClient = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  street: string | null;
  unit: string | null;
  city: string | null;
  state: string | null;
  zip: string | null;
} | null;

const inputClass =
  "w-full border border-[#e2e6ec] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2E6BA6]/30 focus:border-[#2E6BA6]";

function joinAddress(c: ExistingClient) {
  if (!c) return "";
  const line2 = [c.city, c.state].filter(Boolean).join(", ") + (c.zip ? ` ${c.zip}` : "");
  return [c.street, c.unit].filter(Boolean).join(" ") + (line2.trim() ? `, ${line2}` : "");
}

function fmtDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function NewContractForm({
  hasError,
  existingClient,
}: {
  hasError: boolean;
  existingClient: ExistingClient;
}) {
  const [frequency, setFrequency] = useState("");
  const [startDate, setStartDate] = useState("");
  const [rate, setRate] = useState("");
  const [billingContact, setBillingContact] = useState(existingClient?.name || "");
  const [billingEmail, setBillingEmail] = useState(existingClient?.email || "");
  const [billingPhone, setBillingPhone] = useState(existingClient?.phone || "");
  const [content, setContent] = useState("");

  function handleGenerate() {
    setContent(
      buildDefaultClauses({
        frequency: frequency || "[Frequency]",
        startDate: startDate ? fmtDate(startDate) : "",
        rate: rate || "[Monthly Fee]",
        billingContact: billingContact || "[Billing Contact]",
        billingEmail: billingEmail || "[Billing Email]",
        billingPhone: billingPhone || "[Billing Phone]",
      })
    );
  }

  return (
    <form action={createContractAction} className="bg-white border border-[#e2e6ec] rounded-xl p-6 space-y-4">
      {hasError && (
        <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          Please fill in all required fields, including the agreement text.
        </div>
      )}

      {existingClient ? (
        <div className="bg-[#f7f9fb] border border-[#e2e6ec] rounded-lg px-4 py-3">
          <input type="hidden" name="clientId" value={existingClient.id} />
          <p className="text-xs font-semibold text-[#5a6472] mb-1">Client</p>
          <p className="font-medium text-[#1b1f27]">{existingClient.name}</p>
          <p className="text-sm text-[#5a6472]">
            {[existingClient.email, existingClient.phone].filter(Boolean).join(" · ")}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#5a6472] mb-1">Client Name *</label>
            <input type="text" name="clientName" required placeholder="e.g. Arcadia Apartment Homes" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5a6472] mb-1">Client Phone</label>
            <input
              type="text"
              name="clientPhone"
              className={inputClass}
              onChange={(e) => setBillingPhone((p) => p || e.target.value)}
            />
          </div>
        </div>
      )}

      {!existingClient && (
        <div>
          <label className="block text-xs font-semibold text-[#5a6472] mb-1">
            Client Email <span className="font-normal">(required to send the sign link automatically)</span>
          </label>
          <input
            type="email"
            name="clientEmail"
            className={inputClass}
            onChange={(e) => setBillingEmail((p) => p || e.target.value)}
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-semibold text-[#5a6472] mb-1">Service Address *</label>
        <input
          type="text"
          name="serviceAddress"
          required
          defaultValue={joinAddress(existingClient)}
          placeholder="Street, City, State ZIP"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#5a6472] mb-1">Service Type *</label>
          <select name="serviceType" required className={inputClass}>
            <option value="">Select…</option>
            {SERVICE_TYPES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#5a6472] mb-1">Frequency *</label>
          <select name="frequency" required className={inputClass} value={frequency} onChange={(e) => setFrequency(e.target.value)}>
            <option value="">Select…</option>
            {FREQUENCIES.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#5a6472] mb-1">Effective Date</label>
          <input type="date" name="startDate" className={inputClass} value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#5a6472] mb-1">Monthly Fee *</label>
          <input type="text" name="rate" required placeholder="e.g. $3,240.00" className={inputClass} value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
      </div>

      <div className="border-t border-[#e2e6ec] pt-4">
        <p className="text-xs font-semibold text-[#5a6472] mb-3">Billing contact</p>
        <div className="grid grid-cols-3 gap-4">
          <input type="text" name="billingContact" placeholder="Billing Contact" className={inputClass} value={billingContact} onChange={(e) => setBillingContact(e.target.value)} />
          <input type="email" name="billingEmail" placeholder="Billing Email" className={inputClass} value={billingEmail} onChange={(e) => setBillingEmail(e.target.value)} />
          <input type="text" name="billingPhone" placeholder="Billing Phone" className={inputClass} value={billingPhone} onChange={(e) => setBillingPhone(e.target.value)} />
        </div>
      </div>

      <div className="border-t border-[#e2e6ec] pt-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-xs font-semibold text-[#5a6472]">Agreement Text *</label>
          <button
            type="button"
            onClick={handleGenerate}
            className="text-xs font-semibold text-[#1B4B7A] hover:underline"
          >
            ↻ Generate from fields above
          </button>
        </div>
        <textarea
          name="content"
          required
          rows={16}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Fill in the fields above and click "Generate from fields above" to draft the agreement, then edit it here as needed.'
          className={`${inputClass} font-mono text-xs leading-relaxed`}
        />
        <p className="text-[11px] text-[#5a6472] mt-1">
          This is exactly what the client will see and sign — edit freely before sending.
        </p>
      </div>

      <button
        type="submit"
        className="w-full bg-[#1B4B7A] hover:bg-[#2E6BA6] text-white text-sm font-semibold rounded-lg py-2.5 transition-colors mt-2"
      >
        Create &amp; Send Contract
      </button>
    </form>
  );
}
