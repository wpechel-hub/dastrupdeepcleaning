import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createBlankClientAction } from "./new/actions";

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { contracts: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-[#1b1f27]">Clients</h1>
        <form action={createBlankClientAction}>
          <button
            type="submit"
            className="bg-[#1B4B7A] hover:bg-[#2E6BA6] text-white text-sm font-semibold rounded-lg px-4 py-2 transition-colors"
          >
            + New Client
          </button>
        </form>
      </div>

      {clients.length === 0 ? (
        <div className="bg-white border border-[#e2e6ec] rounded-xl p-10 text-center text-[#5a6472]">
          No clients yet. Click &ldquo;New Client&rdquo; to add the first one.
        </div>
      ) : (
        <div className="bg-white border border-[#e2e6ec] rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[#f4f7fb] text-[#5a6472] text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Contact</th>
                <th className="text-left px-4 py-3">City</th>
                <th className="text-left px-4 py-3">Contracts</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e2e6ec]">
              {clients.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/clients/${c.id}`} className="font-medium text-[#1B4B7A] hover:underline">
                      {c.name || "(unnamed)"}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[#5a6472]">
                    <div>{c.email}</div>
                    <div className="text-xs">{c.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-[#5a6472]">{[c.city, c.state].filter(Boolean).join(", ")}</td>
                  <td className="px-4 py-3 text-[#5a6472]">{c._count.contracts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
