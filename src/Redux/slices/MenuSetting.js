// menuSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeMenuSetting: "Review"
};

const menuSlice = createSlice({
  name: "menuSetting",
  initialState,
  reducers: {
    setActiveMenuSetting: (state, action) => {
      state.activeMenuSetting = action.payload;
    }
  }
});

export const { setActiveMenuSetting } = menuSlice.actions;
export default menuSlice.reducer;
