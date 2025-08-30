import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: string | null;
  isAuth: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user = action.payload;
      state.isAuth = true;
      localStorage.setItem("user", action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
      localStorage.removeItem("user");
    },
    setUserFromStorage: (state) => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        state.user = savedUser;
        state.isAuth = true;
      }
    },
  },
});

export const { login, logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
