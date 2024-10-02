import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice";
import authSliceReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSliceReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
  devTools: true, // shows redux devtools on dev env
});

export default store;
