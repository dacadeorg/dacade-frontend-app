import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { setColors } from "../feature/ui.slice";
import { setAllCommunities, setCurrentCommunity } from "../feature/community.slice";
import { HYDRATE } from "next-redux-wrapper";

export const communityService = createApi({
  reducerPath: "communityService",
  baseQuery: baseQuery(),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCommunities: builder.query({
      query: (locale?: string) => ({
        url: `/communities`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setAllCommunities(data));
        return data;
      },
    }),

    getCurrentCommunity: builder.query({
      query: ({ locale, slug }: { locale?: string; slug: string }) => ({
        url: `/communities/${slug}`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setCurrentCommunity(data));
        dispatch(setColors(data.colors));
        return data;
      },
    }),
  }),
});

export const fetchAllCommunities = (locale?: string) => communityService.endpoints.getCommunities.initiate(locale);

export const fetchCurrentCommunity = ({ slug, locale }: { slug: string; locale?: string }) => {
  return communityService.endpoints.getCurrentCommunity.initiate({
    locale,
    slug,
  });
};
export const { useGetCommunitiesQuery } = communityService;
