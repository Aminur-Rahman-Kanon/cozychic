/*
  Warnings:

  - You are about to drop the column `excludeItems` on the `AddOns` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AddOns" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "addItems" TEXT,
    "removeItems" TEXT,
    "itemCount" INTEGER,
    "addOnsId" TEXT NOT NULL,
    CONSTRAINT "AddOns_addOnsId_fkey" FOREIGN KEY ("addOnsId") REFERENCES "OrderItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_AddOns" ("addItems", "addOnsId", "id", "itemCount") SELECT "addItems", "addOnsId", "id", "itemCount" FROM "AddOns";
DROP TABLE "AddOns";
ALTER TABLE "new_AddOns" RENAME TO "AddOns";
CREATE UNIQUE INDEX "AddOns_addOnsId_key" ON "AddOns"("addOnsId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
