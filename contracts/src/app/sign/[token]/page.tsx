import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ContractBody } from "@/lib/contract-text";
import { signContractAction } from "./actions";
import AutoPrint from "./AutoPrint";

export default async function SignPage({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ error?: string; print?: string }>;
}) {
  const { token } = await params;
  const { error, print } = await searchParams;

  const contract = await prisma.contract.findUnique({
    where: { token },
    include: { client: true },
  });

  if (!contract) notFound();

  const fields = {
    clientName: contract.client.name,
    serviceAddress: contract.serviceAddress,
    content: contract.content,
  };

  const companyAcceptedDate = contract.sentAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  async function boundSign(formData: FormData) {
    "use server";
    await signContractAction(token, formData);
  }

  return (
    <div className="min-h-screen bg-[#eef1f5] py-10 px-4">
      {print === "1" && <AutoPrint />}
      <div className="max-w-2xl mx-auto">

        {/* LETTERHEAD */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <Image
              src="/dastrup-logo-color.png"
              alt="Dastrup Deep Cleaning"
              width={100}
              height={81}
              priority
              className="h-10 w-auto object-contain mb-2"
            />
            <p className="font-bold text-[#1a1a1a] text-sm">Dastrup Deep Cleaning</p>
            <p className="text-sm text-[#5a6472]">5975 Monaco Cir, Murray UT 84121</p>
            <p className="text-sm text-[#5a6472]">(801) 207-9056</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm">
              <span className="text-amber-600 font-semibold">Doc No.</span>{" "}
              <span className="text-[#1a1a1a]">{contract.docNumber}</span>
            </p>
            <p className="text-sm mt-1">
              <span className="text-amber-600 font-semibold">Date</span>{" "}
              <span className="text-[#1a1a1a]">{companyAcceptedDate}</span>
            </p>
          </div>
        </div>
        <p className="text-sm text-[#5a6472] mb-6">Service Agreement for {contract.client.name}</p>

        <div className="bg-white border border-[#e2e6ec] rounded-xl shadow-sm">

        <div className="px-8 pt-8 pb-4 text-center border-b border-[#e2e6ec]">
          <h1 className="text-xl font-bold text-[#1a1a1a] tracking-tight">DASTRUP DEEP CLEANING: SERVICE AGREEMENT</h1>
          <div className="w-24 h-0.5 bg-amber-500 mx-auto mt-2" />
          <p className="text-xs text-[#5a6472] mt-3">Client: {contract.client.name}</p>
        </div>

        <div className="px-8 py-6">
          <ContractBody f={fields} />
        </div>

        <div className="px-8 pb-8">
          <h3 className="text-[#5a6472] font-semibold text-xs uppercase tracking-wide mb-4">Accepted:</h3>

          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <div className="border-b border-[#1a1a1a] h-8 flex items-end pb-1">
                {contract.status === "SIGNED" && (
                  <span className="italic" style={{ fontFamily: "Georgia, serif" }}>{contract.signerName}</span>
                )}
              </div>
              <p className="text-xs font-bold text-[#1a1a1a] mt-1">{contract.client.name.toUpperCase()}</p>

              <div className="border-b border-[#1a1a1a] h-6 mt-4 flex items-end pb-1 text-xs text-[#5a6472]">
                {contract.status === "SIGNED" &&
                  contract.signedAt?.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </div>
              <p className="text-xs text-[#5a6472] mt-1">Date Signed</p>
            </div>

            <div>
              <div className="border-b border-[#1a1a1a] h-8 flex items-end pb-1">
                <span className="italic" style={{ fontFamily: "Georgia, serif" }}>Dastrup Deep Cleaning</span>
              </div>
              <p className="text-xs font-bold text-[#1a1a1a] mt-1">DASTRUP DEEP CLEANING</p>

              <div className="border-b border-[#1a1a1a] h-6 mt-4 flex items-end pb-1 text-xs text-[#5a6472]">
                {companyAcceptedDate}
              </div>
              <p className="text-xs text-[#5a6472] mt-1">Date Signed</p>
            </div>
          </div>

          {contract.status === "SIGNED" ? (
            <div className="mt-6 bg-emerald-50 border border-emerald-200 rounded-lg px-5 py-4 text-center">
              <p className="text-emerald-800 font-semibold">✅ This agreement has been signed.</p>
              <p className="text-xs text-emerald-600 mt-2">A copy of this signed agreement is on file with Dastrup Deep Cleaning.</p>
            </div>
          ) : (
            <form action={boundSign} className="no-print mt-6 border-t border-[#e2e6ec] pt-6 space-y-4">
              {error && (
                <div className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                  Please type your full name and check the agreement box before submitting.
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-[#5a6472] mb-1">
                  Type your full name to sign as {contract.client.name}
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
                  I have read and agree to the terms of this Service Agreement, and I am authorized to enter into
                  this contract on behalf of {contract.client.name}.
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
          Thank you for choosing Dastrup Deep Cleaning.
        </div>
        </div>
      </div>
    </div>
  );
}
