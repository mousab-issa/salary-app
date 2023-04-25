import {
  getUserProfile,
  getUserTransactions,
  userWithdraw,
} from "./asyncActions";
import { reducerName } from "./constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: null,
  userTransactions: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const financialSlice = createSlice({
  name: reducerName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(getUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.userTransactions = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      })
      .addCase(userWithdraw.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userWithdraw.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(userWithdraw.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
      });
  },
});

export default financialSlice.reducer;
