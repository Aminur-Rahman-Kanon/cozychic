/*
  Warnings:

  - You are about to drop the column `basePrice` on the `Item` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Price" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "isMultiPrice" BOOLEAN NOT NULL DEFAULT false,
    "amount" REAL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "Price_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MultiPrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "small" REAL NOT NULL,
    "medium" REAL NOT NULL,
    "large" REAL NOT NULL,
    "priceId" TEXT NOT NULL,
    CONSTRAINT "MultiPrice_priceId_fkey" FOREIGN KEY ("priceId") REFERENCES "Price" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT,
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

-- CreateIndex
CREATE UNIQUE INDEX "Price_itemId_key" ON "Price"("itemId");

-- CreateIndex
CREATE UNIQUE INDEX "MultiPrice_priceId_key" ON "MultiPrice"("priceId");
