import { MultiPriceType } from "@/types/item/item"

export function multiPriceHandler<T extends Record<keyof MultiPriceType, any>>(multiPrice: T, size: string): number | undefined {
    if (!multiPrice || !size) return;

    return multiPrice[size];
}