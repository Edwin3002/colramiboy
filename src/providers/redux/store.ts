import { loginApi } from "@/api/services/loginApi";
import counterReducer from "@/providers/redux/slices/counterSlices";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    [loginApi.reducerPath]: loginApi.reducer, // Añades el reducer del api aquí
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware), // Añades el middleware del api
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
