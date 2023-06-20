import { createSlice } from "@reduxjs/toolkit";

let initialState = [];

if (localStorage.getItem("appliedFilters")) {
  initialState = JSON.parse(localStorage.getItem("appliedFilters"));
} else {
  localStorage.setItem("appliedFilters", JSON.stringify(initialState));
}

const filterSlice = createSlice({
  name: "appliedFilters",
  initialState,
  reducers: {
    setfilters: (state, action) => {
      const newFilter = action.payload;
      const option = Object.keys(newFilter)[0];

      // Check if the appliedFilters array is empty
      if (state.length === 0) {
        // If it is empty, just add the new filter
        state.push(newFilter);
      } else {
        // Otherwise, find the index of the existing filter with the same option
        const existingFilterIndex = state.findIndex((filter) =>
          filter.hasOwnProperty(option)
        );

        // If the existing filter is found, replace it with the new filter
        if (existingFilterIndex !== -1) {
          state[existingFilterIndex] = newFilter;
        } else {
          // Otherwise, add the new filter to the end of the array
          state.push(newFilter);
        }
      }
      localStorage.setItem("appliedFilters", JSON.stringify(state));
    },
    // resetFilters: (state) => {
    //   state = [];
    //   localStorage.setItem("appliedFilters", JSON.stringify(state));
    // },
  },
});

export const { setfilters, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
