"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export async function createBlankClientAction() {
  const client = await prisma.client.create({ data: { name: "" } });
  redirect(`/dashboard/clients/${client.id}`);
}
