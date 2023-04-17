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
    getReferrals: builder.query({
      query: () => "referrals",
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setReferralsList(data));
      },
    }),
  }),
});

export const fetchReferrals = (locale: string) =>
  referralsService.endpoints.getReferrals.initiate(locale);
export default referralsService;
