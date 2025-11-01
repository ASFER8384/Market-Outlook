import { apiSlice } from "./apiSlice";

export const ga4Api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMetrics: builder.query({
      query: () => ({
        url: "/ga4/metrics",
        method: "GET",
      }),
      providesTags: ["GA4Metrics"],
    }),
  }),
});

export const { useGetMetricsQuery } = ga4Api;
