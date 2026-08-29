"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function resetPasswordAction(formData: FormData) {
  const token = String(formData.get("token") || "");
  const password = String(formData.get("password") || "");
  const confirm = String(formData.get("confirm") || "");

  if (!token) redirect("/login/forgot");

  if (!password || password.length < 8) {
    redirect(`/login/reset/${token}?error=short`);
  }
  if (password !== confirm) {
    redirect(`/login/reset/${token}?error=mismatch`);
  }

  const user = await prisma.user.findUnique({ where: { resetToken: token } });
  if (!user || !user.resetTokenExpires || user.resetTokenExpires < new Date()) {
    redirect("/login/forgot?expired=1");
  }

  const hashed = await bcrypt.hash(password, 10);
  await prisma.user.update({
    where: { id: user!.id },
    data: { password: hashed, resetToken: null, resetTokenExpires: null },
  });

  redirect("/login?reset=1");
}
