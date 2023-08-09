import { createApi } from "@reduxjs/toolkit/dist/query";
import baseQuery from "@/config/baseQuery";
import { HYDRATE } from "next-redux-wrapper";
import { setChallengesList, setChallengeSubmission, setCurrentChallenge } from "@/store/feature/communities/challenges";
import queryString from "query-string";

/**
 * challenge service, handling all the challenges API call
 *
 */
export const challengeService = createApi({
  reducerPath: "challengeService",
  baseQuery: baseQuery(),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
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
  }),
});

export const fetchChallenge = ({ id, relations }: { id: string; relations: string[] }) =>
  challengeService.endpoints.findChallengeById.initiate({
    id,
    relations,
  });

export const fetchAllChallenges = ({ slug }: { slug: string }) => {
  return challengeService.endpoints.getAllChallenges.initiate(slug);
};

export default challengeService;
