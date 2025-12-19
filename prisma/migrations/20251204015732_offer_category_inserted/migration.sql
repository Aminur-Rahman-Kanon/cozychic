/*
  Warnings:

  - You are about to alter the column `options` on the `IngredientsOption` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.
  - Added the required column `offerId` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "OfferCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IngredientsOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "optionName" TEXT NOT NULL,
    "options" JSONB,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "IngredientsOption_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_IngredientsOption" ("id", "itemId", "optionName", "options") SELECT "id", "itemId", "optionName", "options" FROM "IngredientsOption";
DROP TABLE "IngredientsOption";
ALTER TABLE "new_IngredientsOption" RENAME TO "IngredientsOption";
CREATE TABLE "new_Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "discountPct" REAL,
    "discountFixed" REAL,
    "startsAt" DATETIME,
    "endsAt" DATETIME,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "offerId" TEXT NOT NULL,
    CONSTRAINT "Offer_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "OfferCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Offer" ("active", "description", "discountFixed", "discountPct", "endsAt", "id", "startsAt", "title") SELECT "active", "description", "discountFixed", "discountPct", "endsAt", "id", "startsAt", "title" FROM "Offer";
DROP TABLE "Offer";
ALTER TABLE "new_Offer" RENAME TO "Offer";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "OfferCategory_slug_key" ON "OfferCategory"("slug");
