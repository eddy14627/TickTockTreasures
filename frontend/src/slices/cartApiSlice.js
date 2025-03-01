import { apiSlice } from "./apiSlice";
import { CART_URL } from "../constants";

// API Slice for Cart
export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItemsApi: builder.query({
      query: (userId) => {
        console.log("Sending request to:", CART_URL);
        return {
          url: `${CART_URL}/${userId}`,
          credentials: "include",
        };
      },
      providesTags: ["Cart"],
    }),

    addToCartApi: builder.mutation({
      query: (data) => ({
        url: `${CART_URL}/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    removeFromCartApi: builder.mutation({
      query: ({ userId, productId }) => ({
        url: `${CART_URL}/remove`,
        method: "DELETE",
        body: { userId, productId },
      }),
      invalidatesTags: ["Cart"],
    }),
    clearCart: builder.mutation({
      query: (userId) => ({
        url: `${CART_URL}/clear`,
        method: "DELETE",
        body: { userId },
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartItemsApiQuery,
  useAddToCartApiMutation,
  useRemoveFromCartApiMutation,
  useClearCartMutation,
} = cartApiSlice;
