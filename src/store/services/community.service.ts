import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { setCurrentCommunity } from "../feature/community.slice";

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

    getCurrentCommunity: builder.query({
      query: ({ locale, slug }: { locale?: string; slug: string }) => ({
        url: `/communities/${slug}`,
        headers: {
          "accept-language": locale,
        },
      }),
    }),
  }),
});

export const fetchAllCommunities = (locale?: string) => communityService.endpoints.getCommunities.initiate(locale);

export const fetchCurrentCommunity = ({ slug, locale }: { slug: string; locale?: string }) =>
  communityService.endpoints.getCurrentCommunity.initiate({
    locale,
    slug,
  });
export const { useGetCommunitiesQuery } = communityService;
