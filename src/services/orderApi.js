import { createSlice } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    addOrder: builder.mutation({
      query: (order) => ({
        url: "/orders",
        method: "POST",
        body: order,
      }),
    }),
    getOrderDetails: builder.query({
      query: (id) => `/orders/${id}`,
    }),
    payOrder: builder.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `/orders/${orderId}/pay`,
        method: "PUT",
        body: paymentResult,
      }),
    }),
    deliverOrder: builder.mutation({
      query: (order) => ({
        url: `/orders/${order._id}/deliver`,
        method: "PUT",
      }),
    }),
    getMyOrders: builder.query({
      query: () => "/orders/myorders",
    }),
    getAllOrders: builder.query({
      query: () => "/orders",
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useDeliverOrderMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
} = orderApi;
