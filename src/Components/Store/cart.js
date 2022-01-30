import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedItems: [],
  totalQuantity: 0,
  totalAmount: 0,
  changed: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    replaceCart(state, action) {
      state.selectedItems = action.payload.selectedItems;
      state.totalQuantity = action.payload.totalQuantity;
      state.totalAmount = action.payload.totalAmount;
    },
    addItem(state, action) {
      state.changed = true;

      const newItem = action.payload;
      const existingItem = state.selectedItems.find(
        (item) => item.id === newItem.id
      );
      const qty = +newItem.quantity;
      if (!existingItem) {
        state.selectedItems.push({
          id: newItem.id,
          price: newItem.price,
          quantity: qty,
          totalPrice: newItem.price * qty,
          name: newItem.title,
        });
        state.totalAmount += newItem.price * qty;
      } else {
        existingItem.quantity += qty;
        existingItem.totalPrice = newItem.price * qty;
        state.totalAmount += existingItem.totalPrice;
      }
      state.totalQuantity += +newItem.quantity;
    },
    removeItem(state, action) {
      state.totalQuantity--;
      state.changed = true;
      const id = action.payload;
      const existingItem = state.selectedItems.find((item) => item.id === id);
      if (existingItem.quantity === 1) {
        state.selectedItems = state.selectedItems.filter(
          (item) => item.id !== id
        );
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }
      state.totalAmount -= existingItem.price;
      if (state.totalAmount < 0) state.totalAmount = 0;
    },
    clearCart(state) {
      state.selectedItems = [];
      state.totalAmount = 0;
      state.totalQuantity = 0;
    },
  },
});

export default cartSlice.reducer;
export const cartActions = cartSlice.actions;
