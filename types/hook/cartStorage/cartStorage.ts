export interface CartStorageType {
    createdAt: string,
    updatedAt: string,
    items: CartItemType[],
    total?: Total,
    shipping?: Shipping
}

export type CartItemType = {
    itemId: string,
    name: string,
    quantity : number,
    price: number,
    size: string,
    addOns: {},
    notes: string
}

type Total = {
    itemCount: number,
    uniqueItems: number,
    subtotal: number,
    discount: number,
    shipping: number,
}

type Shipping = {
    method: string,
    cost: number,
    estimatedTime: string
}
