import { ACCESS_TOKEN_KEY, API_END_POINT } from "../../common/constants";
import { reducerName } from "./constants";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getInstance } from "@services/api";
import { deleteSecure, saveSecure } from "@utils/storage";
import { AxiosResponse } from "axios";

const axiosInstance = getInstance();

const {
  auth: { base, ...auth },
} = API_END_POINT;

export const signIn = createAsyncThunk(
  `${reducerName}/signInWithPhone`,
  async ({ phone }: { phone: string }, thunkAPI) => {
    try {
      const response: AxiosResponse<SignInApiResponse> =
        await axiosInstance.post(`/${base}/${auth.signIn}`, {
          phone,
        });

      if (response && response.status !== 200) {
        throw new Error("Error signing in");
      }

      await saveSecure(ACCESS_TOKEN_KEY, response.data.data.token);

      return response.data.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logOut = createAsyncThunk(
  `${reducerName}/logOut`,
  async (_, thunkAPI) => {
    try {
      await deleteSecure(ACCESS_TOKEN_KEY);
      return true;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
