import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/config/baseQuery";

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
    }),

    getAllLearningModules: builder.query({
      query: ({ slug, locale }: { slug: string; locale?: string }) => ({
        url: `courses/${slug}/learning-modules}`,
        headers: {
          "accept-language": locale,
        },
      }),
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

export const findLearningModule = ({ id, locale }: { id: string; locale?: string }) => learningModulesService.endpoints.findLearningModule.initiate({ locale, id });

export const getAllLearningModules = ({ slug, locale }: { slug: string; locale?: string }) => learningModulesService.endpoints.getAllLearningModules.initiate({ slug, locale });

export const submitModuleAnswer = ({ ref, course, locale }: { ref: string; course: string; locale?: string }) =>
  learningModulesService.endpoints.submitModuleAnswer.initiate({ ref, course, locale });
