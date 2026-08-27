import Link from "next/link";
import { prisma } from "@/lib/prisma";

function statusBadge(status: string) {
  const map: Record<string, string> = {
    SENT: "bg-amber-50 text-amber-700 border-amber-200",
    SIGNED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    VOID: "bg-gray-100 text-gray-500 border-gray-200",
  };
  return map[status] || map.SENT;
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ created?: string }>;
}) {
  const { created } = await searchParams;
  const contracts = await prisma.contract.findMany({
    include: { client: true },
    orderBy: { createdAt: "desc" },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "";

  return (
    <div>
      {created && (
        <div className="mb-4 text-sm text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-lg px-3 py-2">
          Contract <strong>{created}</strong> created and sent to the client.
        </div>
      )}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-[#1b1f27]">Contracts</h1>
        <Link
          href="/dashboard/new"
          className="bg-[#1B4B7A] hover:bg-[#2E6BA6] text-white text-sm font-semibold rounded-lg px-4 py-2 transition-colors"
        >
          + New Contract
        </Link>
      </div>

      {contracts.length === 0 ? (
        <div className="bg-white border border-[#e2e6ec] rounded-xl p-10 text-center text-[#5a6472]">
          No contracts yet. Click &ldquo;New Contract&rdquo; to create and send the first one.
        </div>
      ) : (
        <div className="bg-white border border-[#e2e6ec] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f4f7fb] text-[#5a6472] text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Doc #</th>
                <th className="text-left px-4 py-3">Client</th>
                <th className="text-left px-4 py-3">Service</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Sent</th>
                <th className="text-left px-4 py-3">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e6ec]">
              {contracts.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3 font-medium text-[#1b1f27]">{c.docNumber}</td>
                  <td className="px-4 py-3">
                    <div className="font-medium text-[#1b1f27]">{c.client.name}</div>
                    <div className="text-xs text-[#5a6472]">{c.client.email}</div>
                  </td>
                  <td className="px-4 py-3 text-[#5a6472]">{c.serviceType}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block text-xs font-medium border rounded-full px-2 py-0.5 ${statusBadge(c.status)}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#5a6472]">{c.sentAt.toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <Link href={`/sign/${c.token}`} target="_blank" className="text-[#1B4B7A] underline underline-offset-2">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {baseUrl === "" && (
        <p className="mt-4 text-xs text-[#5a6472]">
          Tip: set <code>NEXT_PUBLIC_BASE_URL</code> in your environment so emailed links point to the live site.
        </p>
      )}
    </div>
  );
}
