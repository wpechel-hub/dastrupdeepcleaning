"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

export async function requestPasswordResetAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();

  if (email) {
    const user = await prisma.user.findUnique({ where: { email } });

    // Only proceed if there's an active account — but always show the same
    // confirmation screen either way, so we don't leak which emails exist.
    if (user && user.active) {
      const token = crypto.randomBytes(32).toString("hex");
      const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

      await prisma.user.update({
        where: { id: user.id },
        data: { resetToken: token, resetTokenExpires },
      });

      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
      const resetUrl = `${baseUrl}/login/reset/${token}`;

      await sendPasswordResetEmail({ to: user.email, name: user.name, resetUrl });
    }
  }

  redirect("/login/forgot?sent=1");
}
