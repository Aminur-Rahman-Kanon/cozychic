export interface ItemType {
    id: string,
    name: string,
    slug: string,
    description: string | null,
    basePrice: number,
    isMultiPrice: Boolean,
    multiPrice?: string | null,
    imageUrl: string | null,
    tags?: string | null,
    categoryId?: string,
    active?: Boolean,
    isPopular?: Boolean,
    isSpecial?: Boolean
}

export type MultiPriceType = {
    small: number,
    medium: number,
    large: number
}
