import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query";
import { setReferralsList } from "../feature/referrals.slice";
import { store } from "@/store";
import { clear, setUserReferralsList } from "../feature/user/referrals.slice";
import { Referral } from "@/types/community";

/**
 * Referral api api service
 * @date 4/4/2023 - 11:42:03 AM
 */
const referralsService = createApi({
  reducerPath: "referralsService",
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

    userFetchReferrals: builder.query({
      query: ({ startAfter, locale }: { startAfter?: string | null; locale?: string }) => ({
        url: `referrals/tracking?start_after=${startAfter}`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async ({ startAfter }, { dispatch, queryFulfilled }) => {
        const state = store.getState();
        try {
          const { data } = await queryFulfilled;
          const list: Referral[] = [];
          if (startAfter) {
            list.push(...(state.referrals.list || []));
          } else {
            dispatch(clear());
          }

          list.push(...(data || []));
          dispatch(setUserReferralsList(list));
        } catch (error) {
          console.log("error in fething the userFetchReferrals ", error);
        }
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
export const fetchReferrals = (locale?: string) => referralsService.endpoints.getReferrals.initiate(locale);

export const userFetchReferrals = ({ startAfter, locale }: { startAfter?: string | null; locale?: string }) =>
  referralsService.endpoints.userFetchReferrals.initiate({ startAfter, locale });
export default referralsService;
