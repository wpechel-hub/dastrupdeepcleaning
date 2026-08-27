import { prisma } from "@/lib/prisma";
import NewContractForm from "./NewContractForm";

export default async function NewContractPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; clientId?: string }>;
}) {
  const { error, clientId } = await searchParams;

  const existingClient = clientId ? await prisma.client.findUnique({ where: { id: clientId } }) : null;

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-semibold text-[#1b1f27] mb-6">New Contract</h1>
      <NewContractForm hasError={!!error} existingClient={existingClient} />
    </div>
  );
}
