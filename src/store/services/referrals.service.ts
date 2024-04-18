import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query";
import { setReferralsList } from "../feature/referrals.slice";
import { clear, setUserReferralsList, setHasMoreReferrals, setCount, setLoading } from "../feature/user/referrals.slice";
import { Referral } from "@/types/community";

/**
 * Referral api api service
 * @date 4/4/2023 - 11:42:03 AM
 */
const referralsService = createApi({
  reducerPath: "referralsService",
  refetchOnMountOrArgChange: true,
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
        url: startAfter ? `referrals/tracking?start_after=${startAfter}` : "referrals/tracking",
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async ({ startAfter }, { dispatch, queryFulfilled, getState }) => {
        const state = getState() as any;
        try {
          dispatch(setLoading(true))
          const { data } = await queryFulfilled;
          const list: Referral[] = [];
          if (startAfter) {
            list.push(...(state.userReferrals.userReferralList || []));
          } else {
            dispatch(clear());
          }

          list.push(...(data?.list || []));
          dispatch(setUserReferralsList(list));
          dispatch(setCount(data?.count));
          dispatch(setHasMoreReferrals(data?.list?.length > 0 ? true : false));
          dispatch(setLoading(false))

        } catch (error) {
          console.log("error in fetching the userFetchReferrals ", error);
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

export const userFetchReferrals = ({ startAfter, locale }: { startAfter?: string | null; locale?: string } = {}) =>
  referralsService.endpoints.userFetchReferrals.initiate({ startAfter, locale });
export default referralsService;
