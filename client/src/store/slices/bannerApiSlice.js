import { apiSlice } from "./apiSlice";

const BANNER_URL = "/api/banner";

export const bannerApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => ({
        url: BANNER_URL,
        method: "GET",
      }),
    }),
    addBanner: builder.mutation({
      query: (data) => ({
        url: BANNER_URL,
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export const { useGetBannersQuery, useAddBannerMutation } = bannerApiSlice;
