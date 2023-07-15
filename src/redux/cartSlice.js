import { createSlice } from "@reduxjs/toolkit";
import { createApi } from "@reduxjs/toolkit/query/react";

import { baseQuery } from "../api/apiConfig";

const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery,
  endpoints: (builder) => ({
    addProductToCart: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
    }),
  }),
});

export const { useAddProductToCartQuery } = cartApi;

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: {},
  },
  reducers: {
    addItemToCart: (state, action) => {
      state.cartItems.push(action.payload);
    },
    deleteProductFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.productId !== action.payload
      );
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const {
  addItemToCart,
  deleteProductFromCart,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export const cartSelector = userApi.endpoints.getUserDetails.select;

export default cartSlice.reducer;
