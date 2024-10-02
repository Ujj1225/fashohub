import { apiSlice } from "./apiSlice";

const STATS_URL = "/api/stats";

export const statsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    adminStats: builder.query({
      query: () => ({
        url: `${STATS_URL}/admin`,
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useAdminStatsQuery } = statsApiSlice;
