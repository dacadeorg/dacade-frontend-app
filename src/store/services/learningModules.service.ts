import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/config/baseQuery";
import { setCurrentLearningModule, setLearningModuleList, setLoading } from "../feature/learningModules.slice";

/**
 * Learning module api service
 * @date 3/13/2024 - 4:55:54 PM
 *
 * @type {*}
 */
export const learningModulesService = createApi({
  reducerPath: "learningModulesService",
  baseQuery: baseQuery(),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    findLearningModule: builder.query({
      query: ({ id, locale }: any) => ({
        url: `learning-modules/${id}`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setCurrentLearningModule(data));
        dispatch(setLoading(false));
      },
    }),

    getAllLearningModules: builder.query({
      query: ({ slug, locale }: { slug: string; locale?: string }) => ({
        url: `courses/${slug}/learning-modules}`,
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {

        const { data } = await queryFulfilled;
        dispatch(setLearningModuleList(data));
      },
    }),

    submitModuleAnswer: builder.query({
      query: ({ ref, course, locale }: { ref: string; course: string; locale?: string }) => ({
        url: `interactive-modules/answer`,
        headers: {
          "accept-language": locale,
        },
        body: {
          module: ref,
          course,
          score: 100,
        },
        method: "PUT",
      }),
    }),
  }),
});

/**
 * Find learning module by Id
 * @date 3/13/2024 - 4:56:49 PM
 *
 * @param {{ id: string; locale?: string }} param0
 * @param {string} param0.id
 * @param {string} param0.locale
 * @returns {*}
 */
export const findLearningModule = ({ id, locale }: { id: string; locale?: string }) => learningModulesService.endpoints.findLearningModule.initiate({ locale, id });

export const getAllLearningModules = ({ slug, locale }: { slug: string; locale?: string }) => learningModulesService.endpoints.getAllLearningModules.initiate({ slug, locale });

export const submitModuleAnswer = ({ ref, course, locale }: { ref: string; course: string; locale?: string }) =>
  learningModulesService.endpoints.submitModuleAnswer.initiate({ ref, course, locale });
