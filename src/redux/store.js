import { configureStore } from '@reduxjs/toolkit';
import catalogReducer from './slices/catalogSlice';
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';

const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer,
    user: userReducer,
    order: orderReducer,
  },
});

export default store;