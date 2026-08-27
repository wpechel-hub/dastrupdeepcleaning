import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();

import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

async function main() {
  const [, , name, email, password] = process.argv;
  if (!name || !email || !password) {
    console.error("Usage: npx tsx scripts/create-user.ts \"Full Name\" email@example.com yourPassword");
    process.exit(1);
  }

  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
  const prisma = new PrismaClient({ adapter });

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email: email.toLowerCase() },
    update: { name, password: hashed, active: true },
    create: { name, email: email.toLowerCase(), password: hashed },
  });

  console.log(`✅ User ready: ${user.email}`);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
