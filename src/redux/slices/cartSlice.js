import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const { id, name, price, discount } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      const finalPrice = price * (1 - (discount / 100));

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ id, name, price: finalPrice, quantity: 1, originalPrice: price });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload); // payload is medicine id
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity > 0 ? quantity : 1;
      }
    },
    clearCart: (state) => {
      state.items = [];
    }
  }
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;