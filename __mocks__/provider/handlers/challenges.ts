import { http, HttpResponse } from "msw";
import { challenge, submission } from "../../fixtures/challenge";
const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const challengesHandlers = [
    //  find all submissions in a challenge
    http.get(`${baseUrl}/challenges/:challengeId/submissions`, () => {
        return HttpResponse.json([submission]);
    }),
    //find challenge by id
    http.get(`${baseUrl}/challenges/*`, () => {
        return HttpResponse.json({ ...challenge, submission });
    }),
    http.get(`${baseUrl}/communities/:slug/challenges`, () => {
        return HttpResponse.json([challenge]);
    }),
];

