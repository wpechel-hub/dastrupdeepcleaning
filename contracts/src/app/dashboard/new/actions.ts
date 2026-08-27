"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendContractEmail } from "@/lib/email";

function genDocNumber() {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DDC-${year}-${rand}`;
}

function joinServiceAddress(formData: FormData) {
  const street = String(formData.get("serviceStreet") || "").trim();
  const unit = String(formData.get("serviceUnit") || "").trim();
  const city = String(formData.get("serviceCity") || "").trim();
  const state = String(formData.get("serviceState") || "").trim();
  const zip = String(formData.get("serviceZip") || "").trim();

  const line1 = [street, unit].filter(Boolean).join(" ");
  const line2 = [city, state].filter(Boolean).join(", ") + (zip ? ` ${zip}` : "");
  return [line1, line2.trim()].filter(Boolean).join(", ");
}

export async function createContractAction(formData: FormData) {
  const existingClientId = String(formData.get("clientId") || "").trim();
  const clientName = String(formData.get("clientName") || "").trim();
  const clientEmail = String(formData.get("clientEmail") || "").trim();
  const clientPhone = String(formData.get("clientPhone") || "").trim();
  const serviceAddress = joinServiceAddress(formData);
  const serviceType = String(formData.get("serviceType") || "").trim();
  const frequency = String(formData.get("frequency") || "").trim();
  const startDateRaw = String(formData.get("startDate") || "").trim();
  const rate = String(formData.get("rate") || "").trim();
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
