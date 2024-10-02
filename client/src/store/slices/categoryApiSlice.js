import { apiSlice } from "./apiSlice";

const CATEGORY_URL = "/api/categories";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPrimary: builder.query({
      query: () => ({
        url: `${CATEGORY_URL}/primary`,
        method: "GET",
      }),
    }),
    getSecondary: builder.query({
      query: (pid) => ({
        url: `${CATEGORY_URL}/secondary/${pid}`,
        method: "GET",
      }),
    }),
    getTertiary: builder.query({
      query: ({ pid, sid }) => ({
        url: `${CATEGORY_URL}/tertiary/${pid}/${sid}`,
        method: "GET",
      }),
    }),
  }),
});
export const { useGetPrimaryQuery, useGetSecondaryQuery, useGetTertiaryQuery } =
  categoryApiSlice;
