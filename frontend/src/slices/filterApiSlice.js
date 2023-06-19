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

export const { useGetAvailableBrandNameQuery, useFiltersAppiliedMutation } =
  filterApiSlice;
