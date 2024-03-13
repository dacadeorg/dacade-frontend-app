import { createApi } from "@reduxjs/toolkit/dist/query";
import baseQuery from "@/config/baseQuery";
import { setChallengesList, setChallengeSubmission, setCurrentChallenge, setSubmissionLoading } from "@/store/feature/communities/challenges";
import queryString from "query-string";
import { Submission } from "@/types/bounty";
import { setHasMoreSubmissions, setSubmissionsList } from "@/store/feature/communities/challenges/submissions";
import { setBusy, setError } from "@/store/feature/index.slice";

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
      query: ({ id, relations, locale }) => {
        const params = queryString.stringify({ relations: relations || [] }, { arrayFormat: "bracket" });
        return {
          url: `challenges/${id}?${params}`,
          headers: {
            "accept-language": locale,
          },
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentChallenge(data));
          dispatch(setChallengeSubmission(data.submission));
          return data;
        } catch (error) {
          dispatch(setBusy(false));
          dispatch(setError(error));
        }
      },
    }),

    getAllChallenges: builder.query({
      query: ({ slug, locale }) => ({
        url: `communities/${slug}/challenges`,
        headers: {
          "accept-language": locale,
        },
      }),
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
      query: ({ id, relations, locale }) => {
        const params = queryString.stringify({ relations: relations || [] }, { arrayFormat: "bracket" });
        return {
          url: `challenges/${id}?${params}`,
          headers: {
            "accept-language": locale,
          },
        };
      },
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setSubmissionLoading(true));
          const { data } = await queryFulfilled;
          dispatch(setChallengeSubmission(data.submission));
          dispatch(setSubmissionLoading(false));
          return data;
        } catch (error) {
          dispatch(setBusy(false));
          dispatch(setError(error));
        }
      },
    }),

    fetchAllSubmission: builder.query({
      query: ({ challengeId, startAfter, locale }: { challengeId: string; startAfter?: string; locale?: string }) => ({
        url: startAfter ? `challenges/${challengeId}/submissions?start_after=${startAfter}` : `challenges/${challengeId}/submissions`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async ({ startAfter }, { dispatch, queryFulfilled, getState }) => {
        const state: any = getState();
        try {
          const { data } = await queryFulfilled;
          const list: Submission[] = [];
          if (startAfter) {
            list.push(...(state.submissions.list || []));
          }
          list.push(...(data || []));
          dispatch(setSubmissionsList(list));
          dispatch(setHasMoreSubmissions(data?.length > 0 ? true : false));
        } catch (error) {
          console.log("error in fetching submissions", error);
        }
      },
    }),
  }),
});

export const fetchChallenge = ({ id, relations, locale }: { id: string; relations?: string[]; locale?: string }) =>
  challengeService.endpoints.findChallengeById.initiate({
    id,
    relations: relations || [],
    locale,
  });

export const fetchAllChallenges = ({ slug, locale }: { slug: string; locale?: string }) => {
  return challengeService.endpoints.getAllChallenges.initiate({ slug, locale });
};

/**
 * Fetch all submissions of a challenge in chunks
 * @date 10/5/2023 - 1:02:27 PM
 *
 * @param {{ challengeId: string; startAfter?: string; locale?: string }} { challengeId, startAfter, locale }
 * @returns {*}
 */
export const fetchAllSubmission = ({ challengeId, startAfter = "", locale }: { challengeId: string; startAfter?: string; locale?: string }) => {
  return challengeService.endpoints.fetchAllSubmission.initiate({ challengeId, startAfter, locale });
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
