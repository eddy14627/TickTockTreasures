import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import cartSliceReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice"; // add this line
import productSlice from "./slices/productSlice";
import filterSlice from "./slices/filterSlice";

console.log("apiSlice.reducerPath : ", apiSlice.reducer);
const store = configureStore({
  reducer: {
    /* 
    the reducer property is an object where the property names are
    determined dynamically based on the apiSlice.reducerPath.
    apiSlice.reducerPath is likely a string, and by enclosing it in
    square brackets, the value of that string becomes the property name

    For example, if apiSlice.reducerPath is "api", the reducer object will look like this:
    reducer: {
      api: apiSlice.reducer,
      // other reducers...
    }
    */
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    auth: authReducer, // add this line
    product: productSlice,
    appliedFilters: filterSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
