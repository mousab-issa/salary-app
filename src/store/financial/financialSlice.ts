import {
  getUserProfile,
  getUserTransactions,
  userWithdraw,
} from "./asyncActions";
import { reducerName } from "./constants";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FinancialState = {
  userProfile: null,
  userTransactions: null,
  userBalance: null,
  maxWithdraw: null,
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
      })
      .addCase(getUserTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserTransactions.fulfilled, (state, action) => {
        state.userTransactions = action.payload;
        state.userBalance = action.payload.available;
        state.maxWithdraw = action.payload.available * 0.5;
        state.isLoading = false;
      })
      .addCase(getUserTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(userWithdraw.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userWithdraw.fulfilled, (state, action) => {
        const withdrawnAmount = action.payload.amount;
        if (!state.userBalance) {
          return;
        }
        state.userBalance -= withdrawnAmount;
        state.maxWithdraw = state.userBalance * 0.5;
        state.isLoading = false;
      })
      .addCase(userWithdraw.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default financialSlice.reducer;
