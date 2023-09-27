import { RootState } from "../store";

export const selectCart = (state: RootState) => state.cart;

export function selectCartItemById(id: string) {
    return (state: RootState) => state.cart.items.find((item) => item.id === id);
}