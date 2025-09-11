import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type AuthState = {
  user: string | null;
  isAuth: boolean;
  isAdmin: boolean;
};

const initialState: AuthState = {
  user: null,
  isAuth: false,
  isAdmin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
      state.isAuth = true;
      // localStorage.setItem("user", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      // localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
