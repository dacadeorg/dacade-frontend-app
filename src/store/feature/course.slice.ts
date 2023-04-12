import {
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Community } from "@/types/community";
import { HYDRATE } from "next-redux-wrapper";

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
