import { apiSlice } from "./apiSlice";

export const shopifyApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/shopify/orders", // backend route (we’ll create it next)
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),

    getProducts: builder.query({
      query: () => ({
        url: "/shopify/products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
  }),
});

export const { useGetOrdersQuery, useGetProductsQuery } = shopifyApi;
