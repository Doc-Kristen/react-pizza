import { CartItem } from "../redux/slices/cartSlice";

export const calcTotalPrice = (items: CartItem[]) => {
    return items.reduce((acc, item) => item.count * item.price + acc, 0);
};