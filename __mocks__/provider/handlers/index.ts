import { HttpResponse, http } from "msw"
import { challengesHandlers } from "./challenges"
import { communityHandlers } from "./community"
import { profileHandler } from "./profile"
import { mockBounty } from "../../fixtures/bounty"
import { teamHandler } from "./teams"

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const handlers = [
  ...communityHandlers,
  ...challengesHandlers,
  ...profileHandler,
  ...teamHandler,
  http.get(`${baseUrl}/bounties`, () => {
    return HttpResponse.json([mockBounty])
  })
]
