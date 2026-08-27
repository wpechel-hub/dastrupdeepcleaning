"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { createSessionToken, setSessionCookie } from "@/lib/auth";

export async function loginAction(formData: FormData) {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");
  const next = String(formData.get("next") || "/dashboard");

  if (!email || !password) {
    redirect(`/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.active) {
    redirect(`/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const valid = await bcrypt.compare(password, user!.password);
  if (!valid) {
    redirect(`/login?error=1&next=${encodeURIComponent(next)}`);
  }

  const token = await createSessionToken({ userId: user!.id, email: user!.email, name: user!.name });
  await setSessionCookie(token);

  redirect(next.startsWith("/") ? next : "/dashboard");
}
