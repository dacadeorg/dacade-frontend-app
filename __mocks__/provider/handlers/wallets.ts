import { HttpResponse, http } from "msw";
import { mockWallet } from "../../fixtures/wallet";


const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

export const walletHandler = [
    http.patch(`${baseUrl}/wallets/update/:id`, () => { return }),
    http.get(`${baseUrl}/wallets`, () => { return HttpResponse.json([mockWallet]) }),
]
