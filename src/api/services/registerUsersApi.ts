import { createApi, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import baseQuery from "../microserviceApi";
import { collectionsNames, contextApi, httpMethods } from "../constants";

export interface RegisterUserRequest {
  firstName: string;
  lastName: string;
  address: string;
  typeDocument: string;
  document: number;
  email: string;
  city: string;
  phone: number;
  telegram?: number;
  job: string;
  reference: string;
}

export interface RegisterUserResponse extends RegisterUserRequest {
  collectionId: string;
  collectionName: string;
  id: string;
  created: Date;
  updated: Date;
}

export const registerUsersApi = createApi({
  reducerPath: "registerUsersApi",
  baseQuery,
  endpoints: (builder) => ({
    postRegisterUser: builder.mutation<
      RegisterUserResponse,
      RegisterUserRequest
    >({
      query: (body) => ({
        url: `${contextApi}/${collectionsNames.REGISTER_USERS}/records`,
        method: httpMethods.POST,
        body,
      }),
      transformResponse: (res: RegisterUserResponse) => res,
      transformErrorResponse: (error: FetchBaseQueryError) => error,
    }),
  }),
});

export const { usePostRegisterUserMutation } = registerUsersApi;
