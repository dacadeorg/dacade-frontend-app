import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { setColors } from "../feature/ui.slice";
import { setAllCommunities, setCurrentCommunity } from "../feature/community.slice";
import { setBusy, setError } from "../feature/index.slice";
import { setCourseList, setLoading } from "../feature/learningMaterials.slice";

/**
 * Community Service
 */
export const communityService = createApi({
  reducerPath: "communityService",
  baseQuery: baseQuery(),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    getCommunities: builder.query({
      query: (locale?: string) => ({
        url: `/communities`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setAllCommunities(data));
          return data;
        } catch (error) {
          dispatch(setBusy(false));
          dispatch(setError(error));
        }
      },
    }),

    getCurrentCommunity: builder.query({
      query: ({ locale, slug }: { locale?: string; slug: string }) => ({
        url: `/communities/${slug}`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCurrentCommunity(data));
          dispatch(setColors(data.colors));
          return data;
        } catch (error) {
          dispatch(setBusy(false));
          dispatch(setError(error));
        }
      },
    }),

    fetchLearningMaterials: builder.query({
      query: ({ locale, slug }: { locale?: string; slug: string }) => ({
        url: `/communities/${slug}/learning-materials`,
        headers: {
          "accept-language": locale
        }
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        try {
          dispatch(setLoading(true))
          const { data } = await queryFulfilled
          dispatch(setCourseList(data.courses))
          dispatch(setCourseList(data.learningModules))
          return data
        }
        catch (error) {
          console.log("Encoutered an error while fetching the learning materials", error)
          return null
        }
        finally {
          dispatch(setLoading(false))
        }
      }
    })
  }),
});

/**
 * Fetch All communities endpoint
 * @param locale
 */
export const fetchAllCommunities = (locale?: string) => communityService.endpoints.getCommunities.initiate(locale);

/**
 * Fetch current community
 * @param slug
 * @param locale
 */
export const fetchCurrentCommunity = ({ slug, locale }: { slug: string; locale?: string }) => {
  return communityService.endpoints.getCurrentCommunity.initiate({
    locale,
    slug,
  });
};

export const fetchLearningMaterials = ({ slug, locale }: { slug: string; locale?: string }) => communityService.endpoints.fetchLearningMaterials.initiate({ slug, locale })
export const { useGetCommunitiesQuery } = communityService;
