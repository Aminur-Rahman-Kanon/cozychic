import { MultiPriceType } from "@/types/item/item"
import { Prisma } from '@prisma/client';

export function multiPriceHandler<T extends Record<keyof MultiPriceType, any> | {} >(multiPrice: T, size: string): number | undefined {
    if (!multiPrice || !size) return;

    return multiPrice[size];
}

//return the relational fields of a table
export function getRelationIncludes(modelName: string) {
  const model = Prisma.dmmf.datamodel.models.find(
    (m) => m.name === modelName
  );

  if (!model) throw new Error(`Model ${modelName} not found in schema.`);

  const include: Record<string, true> = {};

  for (const field of model.fields) {
    if (field.kind === "object") {
      include[field.name] = true; //mark relation to be included
    }
  }

  return include;
}
