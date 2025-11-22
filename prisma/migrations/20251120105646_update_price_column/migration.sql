/*
  Warnings:

  - You are about to alter the column `basePrice` on the `Item` table. The data in that column could be lost. The data in that column will be cast from `String` to `Float`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "basePrice" REAL,
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
