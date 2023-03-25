import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../features/data-action";

export const store = configureStore({
  reducer: {
    fetchData: dataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
