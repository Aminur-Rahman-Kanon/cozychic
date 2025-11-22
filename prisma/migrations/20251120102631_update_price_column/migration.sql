/*
  Warnings:

  - You are about to drop the `Price` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "Price_itemId_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Price";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
    "basePrice" TEXT,
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
INSERT INTO "new_Item" ("active", "categoryId", "description", "id", "imageUrl", "isPopular", "isSpecial", "name", "slug", "tags") SELECT "active", "categoryId", "description", "id", "imageUrl", "isPopular", "isSpecial", "name", "slug", "tags" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
CREATE UNIQUE INDEX "Item_slug_key" ON "Item"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
