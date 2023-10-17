import { createSlice } from "@reduxjs/toolkit";
import state from "../State";

export const signupReducer = createSlice({
  name: "signup-reducer",
  initialState: state,
  reducers: {
    updateVerificationEmailData: (state, action) => {
      state.verifyEmailData = action.payload;
    },
    updateLoginData: (state, action) => {
      state.loginData = action.payload;
    },
  },
});

export const { updateVerificationEmailData, updateLoginData } =
  signupReducer.actions;

export default signupReducer.reducer;
