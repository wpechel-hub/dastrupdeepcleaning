-- DropForeignKey
ALTER TABLE "Contract" DROP CONSTRAINT "Contract_clientId_fkey";

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE CASCADE ON UPDATE CASCADE;
