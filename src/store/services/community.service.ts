import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const communityService = createApi({
  reducerPath: "communityService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getCommunities: builder.query({
      query: (locale?: string) => ({
        url: `/communities`,
        headers: {
          "accept-language": locale,
        },
      }),
    }),
  }),
});

export const fetchAllCommunities = (locale?: string) =>
  communityService.endpoints.getCommunities.initiate(locale);
export const { useGetCommunitiesQuery } = communityService;
