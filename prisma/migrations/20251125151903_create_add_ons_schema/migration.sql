/*
  Warnings:

  - You are about to drop the column `addOns` on the `OrderItem` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "AddOns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "addItems" TEXT,
    "excludeItems" TEXT,
    "itemCount" INTEGER,
    "addOnsId" TEXT NOT NULL,
    CONSTRAINT "AddOns_addOnsId_fkey" FOREIGN KEY ("addOnsId") REFERENCES "OrderItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "notes" TEXT,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderItem" ("id", "itemId", "name", "notes", "orderId", "price", "quantity") SELECT "id", "itemId", "name", "notes", "orderId", "price", "quantity" FROM "OrderItem";
DROP TABLE "OrderItem";
ALTER TABLE "new_OrderItem" RENAME TO "OrderItem";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "AddOns_addOnsId_key" ON "AddOns"("addOnsId");
