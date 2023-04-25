import { API_END_POINT } from "../../common/constants";
import { reducerName } from "./constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthenticatedInstance } from "@services/api";
import { AxiosResponse } from "axios";

const axiosInstance = getAuthenticatedInstance();

const {
  auth: { base, ...auth },
} = API_END_POINT;

export const getUserProfile = createAsyncThunk(
  `${reducerName}/getUserProfile`,
  async (_, thunkAPI) => {
    try {
      const response: ApiResponse<GetUserProfileApiResponse> =
        await axiosInstance.get(`/${base}/${auth.userProfile}`);
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserTransactions = createAsyncThunk(
  `${reducerName}/getUserTransactions`,
  async (_, thunkAPI) => {
    try {
      const response: AxiosResponse<GetUserTransactionsApiResponse> =
        await axiosInstance.get(`/${base}/${auth.userTransactions}`);

      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userWithdraw = createAsyncThunk(
  `${reducerName}/userWithdraw`,
  async (amount: { amount: number }, thunkAPI) => {
    try {
      const response: AxiosResponse<UserWithdrawApiResponse> =
        await axiosInstance.post(`/${base}/${auth.userWithdraw}`, { amount });
      return amount;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
