import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import productSlice from "./productSlice";
import filterSlice from "./filterSlice";
import cartSlice from "./CartSlice";
import checkoutSlice from "./checkoutSlice";
import orderSlice from "./orderSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  product: productSlice.reducer,
  filter: filterSlice.reducer,
  cart: cartSlice.reducer,
  checkout: checkoutSlice.reducer,
  orders: orderSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
