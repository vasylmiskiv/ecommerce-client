import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../api/apiConfig";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/products",
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
      query: ({ userId, user }) => ({
        url: `/users/${userId}`,
        method: "PUT",
        body: user,
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
} = userApi;

const userSlice = createSlice({
  name: "user",
  initialState: {
    products: [],
    pages: 0,
    page: 0,
  },
  reducers: {
    logoutUser: (state) => {
      state.userInfo = null;
    },
  },
});

export const { logoutUser } = userSlice.actions;

export const userSelector = userApi.endpoints.getUserDetails.select;

export default userApi.reducer;
