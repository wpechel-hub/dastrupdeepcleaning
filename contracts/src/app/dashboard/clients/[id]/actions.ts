"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function updateClientAction(id: string, formData: FormData) {
  const firstName = String(formData.get("firstName") || "").trim();
  const lastName = String(formData.get("lastName") || "").trim();
  const nameOverride = String(formData.get("name") || "").trim();
  const name = nameOverride || [firstName, lastName].filter(Boolean).join(" ") || "Unnamed Client";

  await prisma.client.update({
    where: { id },
    data: {
      firstName,
      lastName,
      name,
      email: String(formData.get("email") || "").trim() || null,
      phone: String(formData.get("phone") || "").trim() || null,
      street: String(formData.get("street") || "").trim() || null,
      unit: String(formData.get("unit") || "").trim() || null,
      city: String(formData.get("city") || "").trim() || null,
      state: String(formData.get("state") || "").trim() || null,
      zip: String(formData.get("zip") || "").trim() || null,
      notes: String(formData.get("notes") || "").trim() || null,
    },
  });

  revalidatePath(`/dashboard/clients/${id}`);
  redirect(`/dashboard/clients/${id}?saved=1`);
}

export async function deleteContractAction(contractId: string, clientId: string) {
  await prisma.contract.delete({ where: { id: contractId } });
  revalidatePath(`/dashboard/clients/${clientId}`);
}

export async function deleteClientAction(clientId: string) {
  // Cascades to delete all of this client's contracts too (onDelete: Cascade).
  await prisma.client.delete({ where: { id: clientId } });
  revalidatePath("/dashboard/clients");
  redirect("/dashboard/clients");
}
