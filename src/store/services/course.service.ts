import { createApi } from "@reduxjs/toolkit/query/react";
import baseQuery from "@/config/baseQuery";
import { setCurrentCourse } from "../feature/course.slice";
import { setBusy, setError } from "../feature/index.slice";

/**
 * courses api
 * @date 4/14/2023 - 10:56:25 AM
 *
 * @type {*}
 */
export const coursesService = createApi({
  reducerPath: "coursesService",
  baseQuery: baseQuery(),
  refetchOnMountOrArgChange: true,
  endpoints:
    /**
     * @date 4/18/2023 - 12:02:37 PM
     *
     * @param {*} builder
     * @returns {{ getCourse: any; findCourse: any; fetchAllCourse: any; }}
     */
    (builder) => ({
      getCourse: builder.query({
        query: ({ current, locale }) => ({
          url: `communities/${current}/courses`,
          headers: {
            "accept-language": locale,
          },
        }),
      }),
      findCourse: builder.query({
        query: ({ locale, slug }) => ({
          url: `courses/${slug}`,
          headers: {
            "accept-language": locale,
          },
        }),
        onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
          try {
            const { data } = await queryFulfilled;
            dispatch(setCurrentCourse(data));
          } catch (error) {
            dispatch(setBusy(false));
            dispatch(setError(error));
          }
        },
      }),
      fetchAllCourse: builder.query({
        query: ({ locale, slug }) => ({
          url: `communities/${slug}/courses`,
          headers: {
            "accept-language": locale,
          },
        }),
      }),
    }),
});

export const getCourse = ({ locale, current }: { locale?: string; current: string }) => coursesService.endpoints.getCourse.initiate({ current, locale });

export const fetchCourse = ({ locale, slug }: { locale?: string; slug: string }) => coursesService.endpoints.findCourse.initiate({ locale, slug });

export const fetchAllCourses = ({ locale, slug }: { locale?: string; slug: string }) => coursesService.endpoints.fetchAllCourse.initiate({ locale, slug });

export const { useGetCourseQuery, useFetchAllCourseQuery, useFindCourseQuery } = coursesService;
