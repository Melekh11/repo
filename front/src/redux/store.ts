import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/user";
import loaderReducer from "./slices/loading";
import postReducer from "./slices/post";

export const store = configureStore({
  reducer: {
    user: userReducer,
    loader: loaderReducer,
    posts: postReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
