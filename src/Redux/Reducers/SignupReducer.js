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
      let newToken = action.payload?.token
        ? action.payload.token
        : state.loginData?.token;

      if (!action?.payload || Object.keys(action.payload).length <= 0) {
        state.loginData = action.payload;
      } else {
        state.loginData = { ...action.payload, token: newToken };
      }
    },
  },
});

export const {
  updateVerificationEmailData,
  updateLoginData,
  updateApiKeyData,
} = signupReducer.actions;

export default signupReducer.reducer;
