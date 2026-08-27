/*
  Warnings:

  - You are about to drop the column `cancelFee` on the `Contract` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contract" DROP COLUMN "cancelFee",
ADD COLUMN     "billingContact" TEXT,
ADD COLUMN     "billingEmail" TEXT,
ADD COLUMN     "billingPhone" TEXT;
