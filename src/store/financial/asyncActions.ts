import { API_END_POINT } from "../../common/constants";
import { reducerName } from "./constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInstance } from "@services/api";

const axiosInstance = getInstance();

const {
  auth: { base, ...auth },
} = API_END_POINT;

export const getUserProfile = createAsyncThunk(
  `${reducerName}/getUserProfile`,
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/${base}/${auth.userProfile}`);
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
      const response = await axiosInstance.get(
        `/${base}/${auth.userTransactions}`
      );
      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const userWithdraw = createAsyncThunk(
  `${reducerName}/userWithdraw`,
  async (amount, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `/${base}/${auth.userWithdraw}`,
        { amount }
      );
      return response.data.message;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
