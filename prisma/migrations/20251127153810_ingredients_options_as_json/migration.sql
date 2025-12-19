-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IngredientsOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "optionName" TEXT NOT NULL,
    "options" TEXT,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "IngredientsOption_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_IngredientsOption" ("id", "itemId", "optionName", "options") SELECT "id", "itemId", "optionName", "options" FROM "IngredientsOption";
DROP TABLE "IngredientsOption";
ALTER TABLE "new_IngredientsOption" RENAME TO "IngredientsOption";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
