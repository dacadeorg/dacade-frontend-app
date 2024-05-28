import { HttpResponse, http } from "msw"
import { mockInvite, mockTeam } from "../fixtures/challenge"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const teamHandler = [
    http.get(`${baseUrl}/teams/challenge/:id`, () => {
        return HttpResponse.json(mockTeam)
    }),
    http.get(`${baseUrl}/teams/:id`, () => {
        return HttpResponse.json(mockTeam)
    }),
    http.get(`${baseUrl}teams/challenge/:challengeId/invite`, () => {
        return HttpResponse.json(mockInvite)
    }),
    http.post(`${baseUrl}/teams/create`, () => { return }),
    http.post(`${baseUrl}/teams/remove-member`, () => { return }),
    http.post(`${baseUrl}/teams/cancel-invite`, () => { return }),
    http.post(`${baseUrl}/teams/leave/:id`, () => { return }),

]