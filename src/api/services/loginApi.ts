import { createApi, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import baseQuery from "../microserviceApi";
import { collectionsNames, contextApi, httpMethods } from "../constants";

export interface LoginCredentialsRequest {
  identity: string;
  password: string;
}

export interface UserRecord {
  avatar: string;
  collectionId: string;
  collectionName: string;
  created: string;
  email: string;
  emailVisibility: boolean;
  id: string;
  name: string;
  rol: string;
  updated: string;
  verified: boolean;
}

export interface AuthResponse {
  record: UserRecord;
  token: string;
}

export const loginApi = createApi({
  reducerPath: "loginApi",
  baseQuery,
  endpoints: (builder) => ({
    postLogin: builder.mutation<AuthResponse, LoginCredentialsRequest>({
      query: (body) => ({
        url: `${contextApi}/${collectionsNames.USERS}/auth-with-password`,
        method: httpMethods.POST,
        body,
      }),
      transformResponse: (res: AuthResponse) => res,
      transformErrorResponse: (error: FetchBaseQueryError) => error,
    }),
  }),
});

export const { usePostLoginMutation } = loginApi;
