"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function signContractAction(token: string, formData: FormData) {
  const signerName = String(formData.get("signerName") || "").trim();
  const agree = formData.get("agree");

  const contract = await prisma.contract.findUnique({ where: { token } });
  if (!contract || contract.status !== "SENT") {
    redirect(`/sign/${token}`);
  }

  if (!signerName || !agree) {
    redirect(`/sign/${token}?error=1`);
  }

  const hdrs = await headers();
  const ip = hdrs.get("x-forwarded-for")?.split(",")[0]?.trim() || hdrs.get("x-real-ip") || "unknown";

  await prisma.contract.update({
    where: { token },
    data: {
      status: "SIGNED",
      signerName,
      signedAt: new Date(),
      signedIp: ip,
    },
  });

  redirect(`/sign/${token}`);
}
