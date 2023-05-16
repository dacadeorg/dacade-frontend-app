import baseQuery from "@/config/baseQuery";
import { store } from "@/store";
import {
  clearProfileCommunity,
  setCurrentProfileCommunity,
  setListDataUsername,
  setListProfileCommunities,
  setProfileCommunityFeedbacks,
  setProfileCommunityReputation,
  setProfileCommunitySubmissions,
} from "@/store/feature/profile/communities.slice";
import { Reputation, Submission } from "@/types/bounty";
import { Community } from "@/types/community";
import { Feedback } from "@/types/feedback";
import { createApi } from "@reduxjs/toolkit/dist/query/react";

/**
 * Interface for the data returned from the findProfileCommunities endpoint
 * @date 5/14/2023 - 11:07:21 AM
 *
 * @interface FindUserProfileCommuniyResult
 * @typedef {FindUserProfileCommuniyResult}
 */
interface FindUserProfileCommuniyResult {
  community: Community;
  feedbacks: Feedback[];
  submissions: Submission[];
  reputation: Reputation;
}

/**
 * This service is used to get the user information on the profile page by username.
 *  - profile url: profile/{username}
 * It is updating the state of the communities.slice in store/profile/communities.slice
 * @date 5/14/2023 - 11:08:17 AM
 *
 * @type {*}
 */
const profileCommunitiesService: any = createApi({
  reducerPath: "profileCommunities",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    fetchAllProfileCommunities: builder.query<Community[], string>({
      query: (username: string) => {
        if (!username) return;
        if (username !== store.getState().profile.communities.listDataUsername) clearProfileCommunity();
        return `profile/${username}/communities`;
      },

      onQueryStarted: async (username, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setListProfileCommunities(data));
        dispatch(setListDataUsername(username));
      },
    }),

    findProfileCommunties: builder.query<FindUserProfileCommuniyResult, { username: string; slug: string }>({
      query: ({ username, slug }: { username: string; slug: string }) => `profile/${username}/communities/${slug}`,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setCurrentProfileCommunity(data.community));
        dispatch(setProfileCommunityFeedbacks(data.feedbacks));
        dispatch(setProfileCommunitySubmissions(data.submissions));
        dispatch(setProfileCommunityReputation(data.reputation));
      },
    }),
  }),
});

export const { useFetchAllProfileCommunitiesQuery, useFindProfileCommuntiesQuery } = profileCommunitiesService;
export const fetchAllProfileCommunities = (username: string) => profileCommunitiesService.endpoints.fetchAllProfileCommunities.initiate(username);
export default profileCommunitiesService;
