import { configureStore } from "@reduxjs/toolkit";
import  loaderSlice  from "../redux/reducers/loaderSlice";

export const store = configureStore({
  reducer: {
    loader: loaderSlice,
  },
});

export const dispatch = store.dispatch;
