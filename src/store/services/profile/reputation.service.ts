import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query";
import { clearReputationList, setReputationList } from "../../feature/profile/reputation.slice";
import { Reputation } from "@/types/bounty";

export const reputationProfileService = createApi({
  reducerPath: "reputationProfileService",
  baseQuery: baseQuery(),
  endpoints: (builder) => ({
    getProfileReputation: builder.query<Reputation, { username: string; locale?: string }>({
      query: ({ username, locale }: { username: string; locale?: string }) => ({
        url: `/profile/${username}/reputations`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setReputationList(data));
        } catch (error) {
          dispatch(clearReputationList());
          console.log("error", error);
        }
      },
    }),
  }),
});

export const fetchProfileReputation = ({ locale, username }: { locale?: string; username: string }) =>
  reputationProfileService.endpoints.getProfileReputation.initiate({
    username,
    locale,
  });
