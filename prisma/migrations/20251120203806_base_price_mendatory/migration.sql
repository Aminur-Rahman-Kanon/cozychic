/*
  Warnings:

  - Made the column `basePrice` on table `Item` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "basePrice" REAL NOT NULL,
    "isMultiPrice" BOOLEAN NOT NULL DEFAULT false,
    "multiPrice" TEXT,
    "imageUrl" TEXT,
    "tags" TEXT,
    "categoryId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "isPopular" BOOLEAN NOT NULL DEFAULT false,
    "isSpecial" BOOLEAN NOT NULL DEFAULT false,
    CONSTRAINT "Item_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("active", "basePrice", "categoryId", "description", "id", "imageUrl", "isMultiPrice", "isPopular", "isSpecial", "multiPrice", "name", "slug", "tags") SELECT "active", "basePrice", "categoryId", "description", "id", "imageUrl", "isMultiPrice", "isPopular", "isSpecial", "multiPrice", "name", "slug", "tags" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_slug_key" ON "Item"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
