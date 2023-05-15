import baseQuery from "@/config/baseQuery";
import { clearUserReputationList, setUserReputationList } from "@/store/feature/user/reputation.slice";
import { Reputation } from "@/types/bounty";
import { createApi } from "@reduxjs/toolkit/dist/query";

/**
 * Reputation API service, fetches the reputations for the current user logged in
 * @date 4/17/2023 - 7:49:43 PM
 *
 * @type {*}
 */
const userReputationService = createApi({
  reducerPath: "reputationService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    /**
     * Fetch all reputations endpoint
     * @method GET
     */
    fetchReputation: builder.query<Reputation, string>({
      query: (locale: string) => ({
        url: "reputations",
        headers: {
          "Accept-Language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUserReputationList(data));
        } catch (err) {
          dispatch(clearUserReputationList());
        }
      },
    }),
  }),
});

/**
 * Fetch reputation function
 * @param locale - The locale language
 * @returns
 */
export const fetchUserReputations = (locale = "en") => userReputationService.endpoints.fetchReputation.initiate(locale);

export default userReputationService;
