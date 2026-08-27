import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ContractBody } from "@/lib/contract-text";
import { signContractAction } from "./actions";

export default async function SignPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { token } = await params;
  const { error } = await searchParams;

  const contract = await prisma.contract.findUnique({
    where: { token },
    include: { client: true },
  });

  if (!contract) notFound();

  const fields = {
    clientName: contract.client.name,
    serviceAddress: contract.serviceAddress,
    serviceType: contract.serviceType,
    frequency: contract.frequency,
    startDate: contract.startDate || "the agreed start date",
    rate: contract.rate,
    cancelFee: contract.cancelFee,
  };

  async function boundSign(formData: FormData) {
    "use server";
    await signContractAction(token, formData);
  }

  return (
    <div className="min-h-screen bg-[#eef1f5] py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white border border-[#e2e6ec] rounded-xl shadow-sm">
        <div className="px-8 pt-8 pb-4 text-center border-b border-[#e2e6ec]">
          <h1 className="text-2xl font-bold text-[#1B4B7A]" style={{ fontFamily: "Georgia, serif" }}>
            Dastrup Deep Cleaning
          </h1>
          <p className="italic text-[#5a6472] text-sm mt-1">Utah&apos;s Trusted Cleaning Experts</p>
          <p className="text-xs text-[#5a6472] mt-2">Agreement {contract.docNumber}</p>
        </div>

        <div className="px-8 py-6">
          <ContractBody f={fields} />
        </div>

        <div className="px-8 pb-8">
          {contract.status === "SIGNED" ? (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg px-5 py-4 text-center">
              <p className="text-emerald-800 font-semibold">✅ This agreement has been signed.</p>
              <p className="text-sm text-emerald-700 mt-1">
                Signed by <strong>{contract.signerName}</strong> on{" "}
                {contract.signedAt?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
              </p>
              <p className="text-xs text-emerald-600 mt-2">
                A copy of this signed agreement is on file with Dastrup Deep Cleaning.
              </p>
            </div>
          ) : (
            <form action={boundSign} className="border-t border-[#e2e6ec] pt-6 space-y-4">
              <h3 className="text-[#1B4B7A] font-semibold text-sm border-b border-[#1B4B7A] pb-1">
                Sign This Agreement
              </h3>

              {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  Please type your full name and check the agreement box before submitting.
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#5a6472] mb-1">
                  Type your full name to sign
                </label>
                <input
                  type="text"
                  name="signerName"
                  required
                  placeholder="Your full legal name"
                  className="w-full border border-[#e2e6ec] rounded-lg px-3 py-2.5 text-base focus:outline-none focus:ring-2 focus:ring-[#2E6BA6]/30 focus:border-[#2E6BA6]"
                  style={{ fontFamily: "Georgia, serif", fontStyle: "italic" }}
                />
              </div>

              <label className="flex items-start gap-2 text-sm text-[#5a6472]">
                <input type="checkbox" name="agree" required className="mt-0.5" />
                <span>
                  I have read and agree to the terms of this Client Service Agreement, and I am authorized to enter
                  into this contract on behalf of myself or the organization named above.
                </span>
              </label>

              <button
                type="submit"
                className="w-full bg-[#1B4B7A] hover:bg-[#2E6BA6] text-white text-sm font-semibold rounded-lg py-3 transition-colors"
              >
                Sign Agreement
              </button>
            </form>
          )}
        </div>

        <div className="text-center text-xs text-[#5a6472] border-t border-[#e2e6ec] py-4">
          Dastrup Deep Cleaning · (801) 207-9056 · dastrupdeepcleaning@gmail.com
        </div>
      </div>
    </div>
  );
}
