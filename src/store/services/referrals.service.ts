import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query";
import { setReferralsList } from "../feature/referrals.slice";

/**
 * Referral api api service
 * @date 4/4/2023 - 11:42:03 AM
 */
const referralsService = createApi({
  reducerPath: "referralsApi",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    /**
     * Get Referrals endpoint
     * @method GET
     */
    getReferrals: builder.query({
      query: () => "referrals",
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setReferralsList(data));
      },
    }),
  }),
});

/**
 * Fetch referrals function
 * @date 4/18/2023 - 10:26:38 AM
 *
 * @param {string} locale
 * @returns {*}
 */
export const fetchReferrals = (locale: string) =>
  referralsService.endpoints.getReferrals.initiate(locale);
export default referralsService;
