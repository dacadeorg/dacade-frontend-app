import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import {
  setCurrent,
  setFeedbacks,
  setList,
  setListDataUsername,
  setReputation,
  setSubmissions,
} from "@/store/feature/profile.slice";

const fetchProfileCommunityService = createApi({
  reducerPath: "fetchProfileCommunities",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getProfileCommunity: builder.query({
      query: ({
        username,
        slug,
        locale,
      }: {
        locale?: string;
        username: string;
        slug: string;
      }) => ({
        url: `/profile/${username}/communities/${slug}`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          await Promise.all([
            dispatch(setCurrent(data.community)),
            dispatch(setFeedbacks(data.feedbacks)),
            dispatch(setSubmissions(data.submissions)),
            dispatch(setReputation(data.reputation)),
          ]);
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
  }),
});

export const { useGetProfileCommunityQuery } =
  fetchProfileCommunityService;

const fetchProfileCommunitiesService = createApi({
  reducerPath: "fetchProfileCommunities",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getProfileCommunities: builder.query({
      query: ({
        username,
        locale,
      }: {
        locale?: string;
        username: string;
      }) => ({
        url: `/profile/${username}/communities`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (
        { username },
        { dispatch, queryFulfilled }
      ) => {
        try {
          const { data } = await queryFulfilled;
          await Promise.all([
            dispatch(setList(data)),
            dispatch(setListDataUsername([username])),
          ]);
        } catch (error) {
          console.log("error", error);
        }
      },
    }),
  }),
});
export const { useGetProfileCommunitiesQuery } =
  fetchProfileCommunitiesService;

export const fetchProfileCommunities = ({
  username,
  locale,
}: {
  locale?: string;
  username: string;
}) =>
  fetchProfileCommunitiesService.endpoints.getProfileCommunities.initiate(
    { username, locale }
  );

export const fetchProfileCommunity = ({
  username,
  slug,
  locale,
}: {
  locale?: string;
  username: string;
  slug: string;
}) =>
  fetchProfileCommunityService.endpoints.getProfileCommunity.initiate(
    { username, locale, slug }
  );
