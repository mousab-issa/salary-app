import authSlice from "./auth/authSlice";
import finicalSlice from "./financial/financialSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    authSlice,
    finicalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
