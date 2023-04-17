import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Community } from "@/types/community";
import { HYDRATE } from "next-redux-wrapper";

export const communitiesApi = createApi({
  reducerPath: "communitiesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCommunities: builder.query<Community[], void>({
      query: () => "/communities",
    }),
  }),
});
export const { useGetCommunitiesQuery } = communitiesApi;
