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
        state.push(newFilter);
      } else {
        const existingFilterIndex = state.findIndex((filter) =>
          filter.hasOwnProperty(option)
        );

        if (existingFilterIndex !== -1) {
          state[existingFilterIndex] = newFilter;
        } else {
          state.push(newFilter);
        }
      }

      localStorage.setItem("appliedFilters", JSON.stringify(state));

      // Change the keyword in the URL to an empty string
      const url = new URL(window.location.href);
      // url.search = null; // Set query parameters to an empty string
      url.pathname = "/shop"; // Set the pathname to "/shop"
      window.history.pushState(null, "", "/shop");
    },
    resetFilters: (state) => {
      const newState = [];
      localStorage.setItem("appliedFilters", JSON.stringify(newState));

      // Change the keyword in the URL to an empty string
      const url = new URL(window.location.href);

      url.pathname = "/shop"; // Set the pathname to "/shop"
      window.history.pushState(null, "", "/shop");

      return newState;
    },
  },
});

export const { setfilters, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
