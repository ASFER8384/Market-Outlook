import { apiSlice } from "./apiSlice";

export const extendedApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGBPStats: builder.query({
      query: () => ({
        url: "/gbp",
        method: "GET",
      }),
      providesTags: ["GBP"],
    }),
  }),
});

export const { useGetGBPStatsQuery } = extendedApi;
