import { loginApi } from "@/api/services/loginApi";
import authReducer, { AuthSlice } from "@/providers/redux/slices/authSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { encryptTransform } from "redux-persist-transform-encrypt";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";
import { setupListeners } from "@reduxjs/toolkit/query";
import { PersistConfig } from "redux-persist/lib/types";
import { registerUsersApi } from "@/api/services/registerUsersApi";

// Configuración de persistencia con cifrado
// const persistConfig = {
export type RootState = {
  auth: AuthSlice;
};

// export type RootState = ReturnType<typeof store.getState>;

const persistConfig: PersistConfig<RootState> = {
  key: "root", // Nombre de la clave para el almacenamiento
  storage: sessionStorage,
  transforms: [
    encryptTransform({
      secretKey: "mySecretKey123", // Clave secreta para cifrar y descifrar
      onError: (error) => {
        console.error("Error encrypting redux-persist data", error.message);
      },
    }),
  ],
  whitelist: ["auth", "counter"], // Indica qué slices deben ser persistidos
};

const appReducer = combineReducers(
  {
    auth: authReducer,
    [loginApi.reducerPath]: loginApi.reducer,
    [registerUsersApi.reducerPath]: registerUsersApi.reducer,
  }
  // {}
);

// const rootReducer = (state, action) => {
// const rootReducer = (state: { counter: CounterState; auth: AuthSlice; api: CombinedState<{ postLogin: MutationDefinition<LoginCredentials, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, any, FetchBaseQueryMeta>, never, AuthResponse, "api">; }, never, "api">; }, action: PayloadAction) => {
// if (action.type === "user/reset") {
//   localStorage.removeItem("persist:root");
//   state = {};
// }

// return appReducer(state, action);
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
const persistedReducer = persistReducer(persistConfig, appReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
    // getDefaultMiddleware({ serializableCheck: false }).concat(
    //   loginApi.middleware
    // ),
  // Añades el middleware del api
});

// Infer the `RootState` and `AppDispatch` types from the store itself
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

const persistor = persistStore(store);

setupListeners(store.dispatch);

export { store, persistor };
