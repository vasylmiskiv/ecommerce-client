import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../api/apiConfig";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/users/login",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
    }),
    registerUser: builder.mutation({
      query: (user) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => `/users/${userId}`,
    }),
    updateUserProfile: builder.mutation({
      query: (user) => ({
        url: `/users/${user._id}`,
        method: "PUT",
        body: user,
        credentials: "include",
        meta: { addToken: true },
      }),
    }),
    getListOfUsers: builder.query({
      query: () => `/users`,
    }),
    deleteUser: builder.mutation({
      query: ({ userId }) => `/users/${userId}`,
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserProfileMutation,
  useGetListOfUsersQuery,
  useDeleteUserMutation,
} = usersApi;

export const userDetailsSelector = usersApi.endpoints.getUserDetails.select;
