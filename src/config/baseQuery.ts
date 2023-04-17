import { getUserToken } from "@/store/feature/user.slice";
import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import Package from "../../package.json";

const baseQuery = (locale: string = "en") =>
  fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    prepareHeaders: async (headers) => {
      const token = await getUserToken();
      if (token) {
        headers.set("authorization", token);
      }
      headers.set("Content-Type", "application/json");
      headers.set("app-name", Package.name);
      headers.set("Accept-Language", locale);
      headers.set(
        "app-domain",
        typeof window !== undefined
          ? window.location.hostname
          : "dacade.org"
      );
      return headers;
    },
  });

export default baseQuery;
