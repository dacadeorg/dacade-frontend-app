import baseQuery from "@/config/baseQuery";
import { Community } from "@/types/community";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

export const communityService = createApi({
  reducerPath: "communityService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    signUp: builder.query({
      query: (locale: string) => ({
        url: `/communities`,
        headers: {
          "Accept-Language": locale
        },
      }),
    }),
  }),
});


export const getCommunities = (locale: string = "en") => communityService.endpoints.getCommunities.initiate(locale)


