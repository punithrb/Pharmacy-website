import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    currentOrder: null,
    // Mock for all orders (would come from user profile in reality)
    allOrders: [],
  },
  reducers: {
    placeOrder: (state, action) => {
      // Logic for simulating order placement
      const newOrder = {
        id: `ORD${Math.floor(Math.random() * 100000).toString().padStart(5, '0')}`,
        ...action.payload,
        status: 'Processing',
        date: new Date().toISOString().slice(0, 10),
      };
      state.currentOrder = newOrder;
      state.allOrders.push(newOrder);
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const order = state.allOrders.find(o => o.id === orderId);
      if (order) {
        order.status = status;
      }
    }
  }
});

export const { placeOrder, updateOrderStatus } = orderSlice.actions;
export default orderSlice.reducer;