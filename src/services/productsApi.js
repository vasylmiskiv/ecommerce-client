import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "../api/apiConfig";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery,
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: `/products?keyword=${keyword}&pageNumber=${pageNumber}`,
      }),
      meta: { addToken: false },
    }),
    getTopProducts: builder.query({
      query: () => `/products/top`,
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
      }),
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/products`,
        method: "POST",
        body: newProduct,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),
    }),
    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/products/${product._id}`,
        method: "PUT",
        body: product,
      }),
    }),
    addProductReview: builder.mutation({
      query: ({ productId, review }) => ({
        url: `/products/${productId}`,
        method: "POST",
        body: review,
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetTopProductsQuery,
  useGetProductDetailsQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useAddProductReviewMutation,
} = productsApi;

export const productDetailsSelector =
  productsApi.endpoints.getProductDetails.select;
