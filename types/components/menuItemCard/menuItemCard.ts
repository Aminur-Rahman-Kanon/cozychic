export default interface MenuItemCardType {
    id: string;
    slug: string;
    name: string;
    description?: string | null;
    basePrice: number | null;
    isMultiPrice: boolean,
    multiPrice: string | null
    imageUrl?: string | null;
}
