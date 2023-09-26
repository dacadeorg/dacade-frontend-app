import { createApi } from "@reduxjs/toolkit/dist/query";
import baseQuery from "@/config/baseQuery";
import { setChallengesList, setChallengeSubmission, setCurrentChallenge, setSubmissionLoading } from "@/store/feature/communities/challenges";
import queryString from "query-string";

/**
 * challenge service, handling all the challenges API call
 *
 */
export const challengeService = createApi({
  reducerPath: "challengeService",
  baseQuery: baseQuery(),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    findChallengeById: builder.query({
      query: ({ id, relations }) => {
        const params = queryString.stringify({ relations: relations || [] }, { arrayFormat: "bracket" });
        return {
          url: `challenges/${id}?${params}`,
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setCurrentChallenge(data));
        dispatch(setChallengeSubmission(data.submission));
        return data;
      },
    }),

    getAllChallenges: builder.query({
      query: (slug) => `communities/${slug}/challenges`,
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setChallengesList(data));
          return data;
        } catch (err) {
          console.error(err);
        }
      },
    }),

    fetchChallengeByIdAuthenticated: builder.query({
      query: ({ id, relations }) => {
        const params = queryString.stringify({ relations: relations || [] }, { arrayFormat: "bracket" });
        return {
          url: `challenges/${id}?${params}`,
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        dispatch(setSubmissionLoading(true));
        const { data } = await queryFulfilled;
        dispatch(setChallengeSubmission(data.submission));
        dispatch(setSubmissionLoading(false));
        return data;
      },
    }),
  }),
});

export const fetchChallenge = ({ id, relations }: { id: string; relations?: string[] }) =>
  challengeService.endpoints.findChallengeById.initiate({
    id,
    relations: relations || [],
  });

export const fetchAllChallenges = ({ slug }: { slug: string }) => {
  return challengeService.endpoints.getAllChallenges.initiate(slug);
};

/**
 * Refetch the challenge for when the user is authenticated, this only sets the users susbmissions for the current challenge
 * @date 8/14/2023 - 11:26:05 AM
 *
 * @param {{ id: string; locale?: string; relations?: string[] }} { id, locale, relations }
 * @returns {*}
 */
export const fetchChallengeAuthenticated = ({ id, locale, relations }: { id: string; locale?: string; relations?: string[] }) => {
  return challengeService.endpoints.fetchChallengeByIdAuthenticated.initiate({ id, locale, relations });
};

export default challengeService;
