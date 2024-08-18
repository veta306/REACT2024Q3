import { configureStore } from "@reduxjs/toolkit";
import { submissionsReducer } from "./features/submissions";
import { countriesReducer } from "./features/countries";

export const store = configureStore({
  reducer: {
    submissions: submissionsReducer,
    countries: countriesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
