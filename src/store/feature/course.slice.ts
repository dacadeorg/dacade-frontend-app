import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

/**
 * courses api
 * @date 4/14/2023 - 10:56:25 AM
 *
 * @type {*}
 */
export const coursesApi = createApi({
  reducerPath: "coursesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getCourse: builder.query({
      query: (current) => `communities/${current}/courses`,
    }),
  }),
});
export const { useGetCourseQuery } = coursesApi;
