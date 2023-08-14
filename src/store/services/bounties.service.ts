import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query";
import { setBountiesList } from "../feature/bouties.slice";
import { HYDRATE } from "next-redux-wrapper";

/**
 * Bounties api api service
 */
const bountiesService: any = createApi({
  reducerPath: "bountiesApi",
  baseQuery: baseQuery(),
  extractRehydrationInfo: (action, { reducerPath }) => {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    /**
     * Get Bounties endpoint
     * @method GET
     */
    getBounties: builder.query({
      query: () => "bounties",
      onQueryStarted: async (slug, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setBountiesList(data));
      },
    }),
  }),
});

export const fetchAllBounties = (slug?: string) => bountiesService.endpoints.getBounties.initiate(slug);
export default bountiesService;
