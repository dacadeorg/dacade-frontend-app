import { createApi } from "@reduxjs/toolkit/query/react";
import { Community } from "@/types/community";
import { HYDRATE } from "next-redux-wrapper";
import baseQuery from "@/config/baseQuery";

export const communitiesApi = createApi({
  reducerPath: "communitiesApi",
  baseQuery: baseQuery(),
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
