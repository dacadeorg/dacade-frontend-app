import baseQuery from "@/config/baseQuery";
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
  reducerPath: "profileCommunitiesService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    fetchAllProfileCommunities: builder.query<Community[], string>({
      query: (username: string) => {
        if (!username) return;

        return `profile/${username}/communities`;
      },

      onQueryStarted: async (username, { dispatch, queryFulfilled, getState }) => {
        const { data } = await queryFulfilled;
        const state: any = getState();
        if (username !== state.profileCommunities.listDataUsername) {
          clearProfileCommunity();
        }
        dispatch(setListProfileCommunities(data));
        dispatch(setListDataUsername(username));
      },
    }),

    findProfileCommunty: builder.query<FindUserProfileCommuniyResult, { username: string; slug: string }>({
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

export const fetchAllProfileCommunities = (username: string) => profileCommunitiesService.endpoints.fetchAllProfileCommunities.initiate(username);
export const fetchProfileCommunity = ({ username, slug }: { username: string; slug: string }) =>
  profileCommunitiesService.endpoints.findProfileCommunty.initiate({ username, slug });
export default profileCommunitiesService;
