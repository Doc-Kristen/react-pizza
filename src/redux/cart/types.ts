export type CartItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    type: string;
    size: number;
    count: number;
};

export interface CartSliceState {
    items: CartItem[],
    categoryId: number;
    totalPrice: number;
    totalCount: number,
};