import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query";
import { clearReputationList, setReputationList } from "../feature/reputation.slice";
import { Reputation } from "@/types/bounty";

/**
 * Reputation API service
 * @date 4/17/2023 - 7:49:43 PM
 *
 * @type {*}
 */
const reputationService = createApi({
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
          dispatch(setReputationList(data));
        } catch (err) {
          dispatch(clearReputationList());
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
export const fetchReputations = (locale = "en") => reputationService.endpoints.fetchReputation.initiate(locale);

export default reputationService;
