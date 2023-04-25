import { logOut, signIn } from "./asyncActions";
import { reducerName } from "./constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AuthState = {
  isSignedIn: false,
  token: null,
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: "",
};
export const authSlice = createSlice({
  name: reducerName,
  initialState: initialState,
  reducers: {
    login: (state) => {
      state.isSignedIn = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = {
          phone: action.payload.phone,
        };
        state.isLoading = false;
        state.isSignedIn = true;
      })
      .addCase(signIn.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signIn.rejected, (state, action) => {
        Object.assign(state, initialState);
        state.isLoading = false;
        state.isSignedIn = false;
        state.isError = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        Object.assign(state, initialState);
        state.isLoading = false;
        state.isSignedIn = false;
      })
      .addCase(logOut.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(logOut.rejected, (state, action) => {
        Object.assign(state, initialState);
        state.isLoading = false;
        state.isSignedIn = false;
      });
  },
});

export const { login } = authSlice.actions;

export default authSlice.reducer;
