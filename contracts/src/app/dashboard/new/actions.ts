"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendContractEmail } from "@/lib/email";

function genDocNumber() {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DDC-${year}-${rand}`;
}

export async function createContractAction(formData: FormData) {
  const existingClientId = String(formData.get("clientId") || "").trim();
  const clientName = String(formData.get("clientName") || "").trim();
  const clientEmail = String(formData.get("clientEmail") || "").trim();
  const clientPhone = String(formData.get("clientPhone") || "").trim();
  const serviceAddress = String(formData.get("serviceAddress") || "").trim();
  const serviceType = String(formData.get("serviceType") || "").trim();
  const frequency = String(formData.get("frequency") || "").trim();
  const startDateRaw = String(formData.get("startDate") || "").trim();
  const rate = String(formData.get("rate") || "").trim();
  const billingContact = String(formData.get("billingContact") || "").trim();
  const billingEmail = String(formData.get("billingEmail") || "").trim();
  const billingPhone = String(formData.get("billingPhone") || "").trim();
  const content = String(formData.get("content") || "").trim();

  if ((!existingClientId && !clientName) || !serviceAddress || !serviceType || !frequency || !rate || !content) {
    const back = existingClientId ? `/dashboard/new?clientId=${existingClientId}&error=1` : "/dashboard/new?error=1";
    redirect(back);
  }

  const client = existingClientId
    ? await prisma.client.findUniqueOrThrow({ where: { id: existingClientId } })
    : await prisma.client.create({
        data: {
          name: clientName,
          email: clientEmail || null,
          phone: clientPhone || null,
        },
      });

  const contract = await prisma.contract.create({
    data: {
      clientId: client.id,
      docNumber: genDocNumber(),
      serviceType,
      frequency,
      startDate: startDateRaw,
      rate,
      serviceAddress,
      billingContact: billingContact || null,
      billingEmail: billingEmail || null,
      billingPhone: billingPhone || null,
      content,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const signUrl = `${baseUrl}/sign/${contract.token}`;
  const emailTo = clientEmail || client.email;

  if (emailTo) {
    await sendContractEmail({
      to: emailTo,
      clientName: client.name,
      signUrl,
      docNumber: contract.docNumber,
    });
  }

  redirect(`/dashboard?created=${contract.docNumber}`);
}
