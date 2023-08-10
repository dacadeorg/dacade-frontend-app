import baseQuery from "@/config/baseQuery";
import { setFilterBy, setLoading, setScoreboardList } from "@/store/feature/communities/scoreboard.slice";
import { Scoreboard } from "@/types/scoreboard";
import { createApi } from "@reduxjs/toolkit/dist/query";

interface FilterScoreboardsArgs {
  slug: string;
  filterBy?: string;
  sortBy?: string;
  locale?: string;
}

/**
 * Scoreboard service
 * @date 8/9/2023 - 3:54:32 PM
 *
 * @type {*}
 */
const scoreboardService = createApi({
  reducerPath: "scoreboardService",
  baseQuery: baseQuery(),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    fetchAllScoreboards: builder.query<Scoreboard[], { slug: string; locale?: string }>({
      query: ({ slug, locale }) => ({
        url: `communities/${slug}/scoreboard`,
        headers: {
          "Accept-Language": locale || "en",
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading(true));
          const { data } = await queryFulfilled;
          dispatch(setFilterBy("all"));
          dispatch(setScoreboardList(data));
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      },
    }),

    filterScroreboards: builder.query<Scoreboard[], FilterScoreboardsArgs>({
      query: ({ slug, filterBy, sortBy, locale }) => ({
        url: `communities/${slug}/scoreboard?filter-by=${filterBy}`,
        headers: {
          "Accept-Language": locale || "en",
        },
      }),
    }),
  }),
});

export const fetchAllScoreboards = ({ slug, locale }: { slug: string; locale?: string }) => scoreboardService.endpoints.fetchAllScoreboards.initiate({ slug, locale });
export const filterScoreboards = ({ filterBy, locale, sortBy, slug }: FilterScoreboardsArgs) =>
  scoreboardService.endpoints.filterScroreboards.initiate({ filterBy, slug, locale, sortBy });

export default scoreboardService;
