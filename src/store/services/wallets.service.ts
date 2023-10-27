import baseQuery from "@/config/baseQuery";
import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { setWalletList } from "../feature/user/wallets.slice";

/**
 * Update wallet payload interface
 * @date 4/17/2023 - 5:04:48 PM
 *
 * @interface UpdateWalletPayload
 * @typedef {UpdateWalletPayload}
 */
interface UpdateWalletPayload {
  id?: string;
  address: string;
  signature?: string;
}

/**
 * User wallet Api endpoints
 * @date 4/17/2023 - 4:50:11 PM
 *
 * @type {*}
 */
const walletsService = createApi({
  reducerPath: "walletService",
  baseQuery: baseQuery(),
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    /**
     * Update wallet endpoint
     * @method PATCH
     * @query {UpdateWalletPayload} wallet function parameter which is composed by:
     *  - payload: The data to update the wallet
     *  - locale: The local language which is by default 'en'
     */
    updateWallet: builder.mutation<UpdateWalletPayload, any>({
      query: ({ payload, locale }: { payload: UpdateWalletPayload; locale: string }) => ({
        url: `wallets/update/${payload.id}`,
        method: "PATCH",
        body: {
          address: payload.address,
          signature: payload.signature,
        },
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { queryFulfilled }) => {
        await queryFulfilled;
      },
    }),

    /**
     * Fetches all wallets.
     * @method GET
     * @query {locale} - The locale language
     */
    getAllWallets: builder.query({
      query: (locale: string) => ({
        url: "wallets",
        headers: {
          "accept-language": locale,
        },
      }),
      onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
        const { data } = await queryFulfilled;
        dispatch(setWalletList(data));
      },
    }),
  }),
});

/**
 * Update wallet function.
 * @date 4/17/2023 - 4:51:06 PM
 *
 * @param {UpdateWalletPayload} payload
 * @param {string} locale
 * @returns {*}
 */
export const updateWallet = (payload: UpdateWalletPayload, locale: string = "en") => walletsService.endpoints.updateWallet.initiate({ payload, locale });

/**
 * Get all wallets function
 * @date 4/17/2023 - 5:03:17 PM
 *
 * @param {string} locale
 * @returns {*}
 */
export const fetchAllWallets = (locale = "en") => walletsService.endpoints.getAllWallets.initiate(locale);

export default walletsService;
