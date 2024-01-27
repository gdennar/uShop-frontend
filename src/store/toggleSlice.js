import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggle: [],
};
const filterSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleOpen: (state) => {
      state.isToggle = !state.isToggle;
    },
  },
});
