import { getUserToken } from "@/store/feature/user.slice";
import {
  BaseQueryFn,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";
import Package from "../../package.json";

/**
 * Redux base query configuration
 * @date 4/17/2023 - 3:55:21 PM
 *
 * @exports default
 * @param {string} [locale="en"]
 * @returns {BaseQueryFn}
 */
const baseQuery = (locale: string = "en"): BaseQueryFn =>
  fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers, _) => {
      headers.set("Content-Type", "application/json");
      headers.set("app-name", Package.name);
      headers.set("Accept-Language", locale);
      headers.set(
        "app-domain",
        typeof window !== "undefined"
          ? window.location.hostname
          : "dacade.org"
      );

      try {
        const token = await getUserToken();
        if (token) {
          headers.set("authorization", token);
        }
      } catch (err) {
        console.error(err);
      }

      return headers;
    },
  });

export default baseQuery;
