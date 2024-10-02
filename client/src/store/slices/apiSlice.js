import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { backend_url } from "../../data/constants";

const baseUrl = backend_url;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["User", "Product", "Wishlist", "Bag", "Order", "Request"],
  endpoints: (builder) => ({}),
});
