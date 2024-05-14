import { http, HttpResponse, delay } from "msw";
import { mockCommunity } from "../community";

export const handlers = [
  http.get("/api/communities", async () => {
    await delay(150);
    console.log("Called called called");
    return HttpResponse.json({ mockCommunity });
  }),
];
