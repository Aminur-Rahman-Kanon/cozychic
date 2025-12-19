/*
  Warnings:

  - You are about to drop the `MultiPrice` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Price" ADD COLUMN "multiPrice" TEXT;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MultiPrice";
PRAGMA foreign_keys=on;
