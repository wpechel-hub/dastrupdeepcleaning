"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendSignedCopyEmail } from "@/lib/email";

const COMPANY_EMAIL = "dastrupdeepcleaning@gmail.com";

export async function signContractAction(token: string, formData: FormData) {
  const signerName = String(formData.get("signerName") || "").trim();
  const billingContact = String(formData.get("billingContact") || "").trim();
  const billingEmail = String(formData.get("billingEmail") || "").trim();
  const billingPhone = String(formData.get("billingPhone") || "").trim();
  const agree = formData.get("agree");

  const contract = await prisma.contract.findUnique({ where: { token }, include: { client: true } });
  if (!contract || contract.status !== "SENT") {
    redirect(`/sign/${token}`);
  }

  if (!signerName || !agree || !billingContact || !billingEmail || !billingPhone) {
    redirect(`/sign/${token}?error=1`);
  }

  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || "unknown";
  const signedAt = new Date();

  await prisma.contract.update({
    where: { token },
    data: {
      status: "SIGNED",
      signerName,
      signedAt,
      signedIp: ip,
      billingContact,
      billingEmail,
      billingPhone,
    },
  });

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const viewUrl = `${baseUrl}/sign/${token}`;

  const emailPayload = {
    clientName: contract!.client.name,
    docNumber: contract!.docNumber,
    signerName,
    signedAt,
    viewUrl,
  };

  // Send a signed copy to the client and to Dastrup. Best-effort — a failed
  // notification email should never block the signature from being recorded.
  const recipients: { to: string; recipientLabel: string }[] = [
    { to: COMPANY_EMAIL, recipientLabel: "Dastrup Deep Cleaning" },
  ];
  if (contract!.client.email) {
    recipients.push({ to: contract!.client.email, recipientLabel: contract!.client.name });
  }

  await Promise.allSettled(
    recipients.map((r) => sendSignedCopyEmail({ to: r.to, recipientLabel: r.recipientLabel, ...emailPayload }))
  );

  redirect(`/sign/${token}`);
}
