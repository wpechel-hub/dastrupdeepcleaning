import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateClientAction, deleteContractAction } from "./actions";

function statusBadge(status: string) {
  const map: Record<string, string> = {
    SENT: "bg-amber-50 text-amber-700 border-amber-200",
    SIGNED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    VOID: "bg-gray-100 text-gray-500 border-gray-200",
  };
  return map[status] || map.SENT;
}

const inputClass =
  "w-full border border-[#e2e6ec] rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#2E6BA6]/30 focus:border-[#2E6BA6]";

export default async function ClientDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ saved?: string }>;
}) {
  const { id } = await params;
  const { saved } = await searchParams;

  const client = await prisma.client.findUnique({
    where: { id },
    include: { contracts: { orderBy: { createdAt: "desc" } } },
  });

  if (!client) notFound();

  const boundUpdate = async (formData: FormData) => {
    "use server";
    await updateClientAction(id, formData);
  };

  return (
    <div className="max-w-3xl">
      <Link href="/dashboard/clients" className="text-xs text-[#1B4B7A] hover:underline">
        ← All Clients
      </Link>

      <h1 className="text-xl font-semibold text-[#1b1f27] mt-3 mb-6">{client.name || "New Client"}</h1>

      {saved && (
        <div className="mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          Client details saved.
        </div>
      )}

      <form action={boundUpdate} className="bg-white border border-[#e2e6ec] rounded-xl p-6 space-y-4 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#5a6472] mb-1">First Name</label>
            <input type="text" name="firstName" defaultValue={client.firstName} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5a6472] mb-1">Last Name</label>
            <input type="text" name="lastName" defaultValue={client.lastName} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#5a6472] mb-1">Name on Contract</label>
          <input type="text" name="name" defaultValue={client.name} placeholder="e.g. Arcadia Apartment Homes" className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-[#5a6472] mb-1">Email</label>
            <input type="email" name="email" defaultValue={client.email || ""} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#5a6472] mb-1">Phone</label>
            <input type="text" name="phone" defaultValue={client.phone || ""} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#5a6472] mb-1">Street Address</label>
          <div className="grid grid-cols-3 gap-4">
            <input type="text" name="street" defaultValue={client.street || ""} placeholder="Street" className={`${inputClass} col-span-2`} />
            <input type="text" name="unit" defaultValue={client.unit || ""} placeholder="Unit / Suite" className={inputClass} />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <input type="text" name="city" defaultValue={client.city || ""} placeholder="City" className={`${inputClass} col-span-1`} />
          <input type="text" name="state" defaultValue={client.state || ""} placeholder="State" className={inputClass} />
          <input type="text" name="zip" defaultValue={client.zip || ""} placeholder="ZIP" className={inputClass} />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#5a6472] mb-1">Notes</label>
          <textarea name="notes" defaultValue={client.notes || ""} rows={3} className={inputClass} />
        </div>

        <button
          type="submit"
          className="bg-[#1B4B7A] hover:bg-[#2E6BA6] text-white text-sm font-semibold rounded-lg px-5 py-2.5 transition-colors"
        >
          Save Client
        </button>
      </form>

      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-[#5a6472] uppercase tracking-wide">Contracts</h2>
        <Link
          href={`/dashboard/new?clientId=${client.id}`}
          className="bg-[#1B4B7A] hover:bg-[#2E6BA6] text-white text-xs font-semibold rounded-full px-4 py-2 transition-colors whitespace-nowrap"
        >
          + New Contract
        </Link>
      </div>

      {client.contracts.length === 0 ? (
        <div className="bg-white border border-[#e2e6ec] rounded-xl p-8 text-center text-[#5a6472]">
          No contracts yet for this client.
        </div>
      ) : (
        <div className="space-y-2">
          {client.contracts.map((c) => {
            const boundDelete = async () => {
              "use server";
              await deleteContractAction(c.id, client.id);
            };
            return (
              <div key={c.id} className="bg-white border border-[#e2e6ec] rounded-xl px-4 py-3 flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm text-[#1b1f27]">{c.docNumber}</p>
                  <p className="text-xs text-[#5a6472]">
                    Sent {c.sentAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <span className={`border rounded-full px-2 py-0.5 ${statusBadge(c.status)}`}>{c.status}</span>
                  <Link href={`/sign/${c.token}`} target="_blank" className="text-[#1B4B7A] hover:underline">
                    View
                  </Link>
                  <Link href={`/sign/${c.token}?print=1`} target="_blank" className="text-amber-700 hover:underline">
                    Download
                  </Link>
                  <form action={boundDelete}>
                    <button type="submit" className="text-red-600 hover:underline">
                      Delete
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
