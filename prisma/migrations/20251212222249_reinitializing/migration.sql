/*
  Warnings:

  - You are about to drop the column `sortOrder` on the `OfferCategory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OfferCategory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true
);
INSERT INTO "new_OfferCategory" ("active", "description", "id", "slug", "title") SELECT "active", "description", "id", "slug", "title" FROM "OfferCategory";
DROP TABLE "OfferCategory";
ALTER TABLE "new_OfferCategory" RENAME TO "OfferCategory";
CREATE UNIQUE INDEX "OfferCategory_slug_key" ON "OfferCategory"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
