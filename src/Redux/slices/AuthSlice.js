// src/features/auth/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: !!localStorage.getItem("authToken"),
  token: localStorage.getItem("authToken") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem("authToken", action.payload);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem("authToken");
    },
    checkLogin: (state, action) => {
      const token = localStorage.getItem("authToken");
      const { email } = action.payload;
      if (token) {
        state.isLoggedIn = true;
        state.token = token;
        state.email = email;
      } else {
        state.isLoggedIn = false;
        state.token = null;
        state.email = null;
      }
    },
  },
});

export const { login, logout, checkLogin } = authSlice.actions;
export default authSlice.reducer;
