-- CreateTable
CREATE TABLE "IngredientsOption" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "optionName" TEXT NOT NULL,
    "options" JSONB NOT NULL,
    "itemId" TEXT NOT NULL,
    CONSTRAINT "IngredientsOption_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
