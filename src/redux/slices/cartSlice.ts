import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
}

interface CartSliceState {
  items: CartItem[],
  categoryId: number;
  totalPrice: number;
  totalCount: number,
}

const initialState: CartSliceState = {
  items: [],
  categoryId: 0,
  totalPrice: 0,
  totalCount: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = state.items.reduce((acc, item) => item.count * item.price + acc, 0);
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
        state.totalPrice = state.items.reduce((acc, item) => item.count * item.price + acc, 0);
      }
    },
  },
});

export const selectCart = (state: RootState) => state.cart;

export function selectCartItemById(id: string) {
  return (state: RootState) => state.cart.items.find((item) => item.id === id);
}

export const { addItem, removeItem, clearItems, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
