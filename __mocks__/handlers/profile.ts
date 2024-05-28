import { HttpResponse, http } from "msw";
import { certificate, mockMinting, mockReputation } from "../fixtures/profile";
import { mockCommunity } from "../fixtures/community";
import { submission } from "../fixtures/challenge";
import { mockUser } from "../fixtures/user";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL


export const profileHandler = [
    http.get(`${baseUrl}/certificates`, () => {
        return HttpResponse.json([certificate])
    }),
    http.get(`${baseUrl}/certificates/:id`, () => {
        return HttpResponse.json(certificate)
    }),
    http.post(`${baseUrl}/certificates/mint`, () => {
        return HttpResponse.json(mockMinting)
    }),
    http.get(`${baseUrl}/profile/:username/communities`, () => {
        return HttpResponse.json([mockCommunity])
    }),
    http.get(`${baseUrl}/profile/:username/communities/:slug`, async () => {
        return HttpResponse.json({
            community: mockCommunity,
            submissions: [submission],
            reputation: null,
            feedbacks: null
        })
    }),
    http.get(`${baseUrl}/profile/:username/reputations`, async () => {
        return HttpResponse.json(mockReputation)
    }),
    http.get(`${baseUrl}/users/:username`, async () => {
        return HttpResponse.json(mockUser)
    }),
    http.get(`${baseUrl}/reputations`, async () => {
        return HttpResponse.json([mockReputation])
    }),
]