import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  watch: null,
};

export const productSlice = createSlice({
  name: "productSlice",
  initialState,
  reducers: {
    setNewProductDetails: (state, action) => {
      state.watch = action.payload.watch;
    },
  },
});

export const { setNewProductDetails } = productSlice.actions;
export default productSlice.reducer;
