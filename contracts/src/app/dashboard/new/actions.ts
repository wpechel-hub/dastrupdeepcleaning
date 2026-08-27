"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendContractEmail } from "@/lib/email";

function genDocNumber() {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `DDC-${year}-${rand}`;
}

function formatDate(iso: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) return iso;
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export async function createContractAction(formData: FormData) {
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

  if (!clientName || !serviceAddress || !serviceType || !frequency || !rate) {
    redirect("/dashboard/new?error=1");
  }

  const client = await prisma.client.create({
    data: {
      name: clientName,
      email: clientEmail || null,
      phone: clientPhone || null,
      address: serviceAddress,
    },
  });

  const contract = await prisma.contract.create({
    data: {
      clientId: client.id,
      docNumber: genDocNumber(),
      serviceType,
      frequency,
      startDate: startDateRaw ? formatDate(startDateRaw) : "",
      rate,
      serviceAddress,
      billingContact: billingContact || null,
      billingEmail: billingEmail || null,
      billingPhone: billingPhone || null,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const signUrl = `${baseUrl}/sign/${contract.token}`;

  if (clientEmail) {
    await sendContractEmail({
      to: clientEmail,
      clientName,
      signUrl,
      docNumber: contract.docNumber,
    });
  }

  redirect(`/dashboard?created=${contract.docNumber}`);
}
