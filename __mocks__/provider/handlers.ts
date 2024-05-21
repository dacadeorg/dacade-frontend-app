import { http, HttpResponse, delay } from "msw";

export const handlers = [
  http.get("/api/communities", async () => {
    await delay(150);
    return HttpResponse.json({ community: {} });
  }),
];
