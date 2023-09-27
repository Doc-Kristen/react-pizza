import { calcTotalPrice } from "./calcTotalPrice";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const totalPrice = items.length ? calcTotalPrice(items) : 0;
    return {
        items, totalPrice
    }
};