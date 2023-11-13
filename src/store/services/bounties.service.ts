import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query";
import { setBountiesList, setLoading } from "../feature/bouties.slice";
import { HYDRATE } from "next-redux-wrapper";
import { setBusy, setError } from "../feature/index.slice";

/**
 * Bounties api api service
 */
const bountiesService = createApi({
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
        dispatch(setLoading(true))
        try {
          const { data } = await queryFulfilled;
          if (data) dispatch(setBountiesList(data));
          dispatch(setLoading(false))
          return data
        } catch (error) {
          dispatch(setBusy(false));
          dispatch(setError(error));
        }
      },
    }),
  }),
});

export const fetchAllBounties = (slug?: string) => bountiesService.endpoints.getBounties.initiate(slug);
export default bountiesService;
