import { FILTERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const filterApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAvailableBrandName: builder.query({
      query: () => ({
        url: `${FILTERS_URL}/brandList`,
      }),
      keepUnusedDataFor: 5,
    }),
    filterByBrandName: builder.mutation({
      query: ({ pageNumber, data }) => ({
        url: `${FILTERS_URL}/filterB`,
        params: { pageNumber },
        method: "POST",
        body: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Filters"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: `${FILTERS_URL}/reset`,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Filters"],
    }),
    filterByGender: builder.mutation({
      query: ({ keyword, pageNumber, data }) => ({
        url: `${FILTERS_URL}/filterG`,
        method: "POST",
        params: { keyword, pageNumber },
        body: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Filters"],
    }),
    filterByWatchType: builder.mutation({
      query: ({ keyword, pageNumber, data }) => ({
        url: `${FILTERS_URL}/filterWt`,
        method: "POST",
        params: { keyword, pageNumber },
        body: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Filters"],
    }),
    filterByPrice: builder.mutation({
      query: ({ keyword, pageNumber, data }) => ({
        url: `${FILTERS_URL}/filterP`,
        method: "POST",
        params: { keyword, pageNumber },
        body: data,
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Filters"],
    }),
    filtersAppilied: builder.mutation({
      query: ({ filters, pageNumber, keyword }) => ({
        url: `${FILTERS_URL}/filterApplied`,
        method: "POST",
        params: { pageNumber, keyword },
        body: filters,
      }),
      // keepUnusedDataFor: 5,
      providesTags: ["Filters"],
    }),
  }),
});

export const {
  useGetAvailableBrandNameQuery,
  useFilterByBrandNameMutation,
  useGetAllProductsQuery,
  useFilterByGenderMutation,
  useFilterByWatchTypeMutation,
  useFilterByPriceMutation,
  useFiltersAppiliedMutation,
} = filterApiSlice;
