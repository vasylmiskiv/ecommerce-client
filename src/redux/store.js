import { configureStore } from "@reduxjs/toolkit";

import { productsApi } from "../services/productsApi";
import { usersApi } from "../services/usersApi";

import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(productsApi.middleware)
      .concat(usersApi.middleware),
});
