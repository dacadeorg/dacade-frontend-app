import { http, HttpResponse } from "msw";
import { mockCommunity } from "../fixtures/community";
import { mockScoreboard } from "../fixtures/scoreboard";
import { mockCourse } from "../fixtures/course";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const communityHandlers = [
    http.get(`${baseUrl}/communities`, () => {
        return HttpResponse.json(mockCommunity);
    }),
    http.get(`${baseUrl}/communities/:slug/scoreboard`, () => {
        return HttpResponse.json([mockScoreboard]);
    }),
    http.get(`${baseUrl}/communities/:slug/courses`, () => {
        return HttpResponse.json([mockCourse]);
    }),
    http.get(`${baseUrl}/communities/:slug/courses`, () => {
        return HttpResponse.json([mockCourse]);
    })
];


