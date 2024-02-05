import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isToggle: false,
};
const toggleSlice = createSlice({
  name: "toggle",
  initialState,
  reducers: {
    toggleOpen: (state, action) => {
      return { ...state, isToggle: action.payload.toggle };
    },
  },
});

export const toggleAction = toggleSlice.actions;

export default toggleSlice;
