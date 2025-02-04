import { createApi, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import baseQuery from "../microserviceApi";
import { collectionsNames, contextApi, httpMethods } from "../constants";

export interface LoginCredentials {
  identity: string;
  password: string;
}

export interface UserRecord {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string; // Podría ser un `Date` en lugar de `string` si prefieres manejarlo como una fecha
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  rol: string;
  updated: string; // También podría ser un `Date`
  verified: boolean;
}

export interface AuthResponse {
  record: UserRecord;
  token: string;
}

export const loginApi = createApi({
  reducerPath: "api", // Puedes poner un nombre para el reducer
  baseQuery,
  endpoints: (builder) => ({
    // Aquí defines los endpoints que usará tu API
    // getUser: builder.query<User, void>({
    //   query: () => 'user', // URL relativa al `baseUrl`
    // }),
    postLogin: builder.mutation<AuthResponse, LoginCredentials>({
      query: (body) => ({
        url: `${contextApi}/${collectionsNames.USERS}/auth-with-password`,
        method: httpMethods.POST,
        body,
      }),
      transformResponse: (res: AuthResponse) => res,
      transformErrorResponse: (error: FetchBaseQueryError) => error
    }),
    // Otros endpoints pueden seguir aquí...
  }),
});

// Exporta los hooks generados automáticamente por `createApi`
export const { usePostLoginMutation } = loginApi;
