import { createSlice } from "@reduxjs/toolkit";
import { Wallet } from "@/types/wallet";

/**
 * @typedef {Object} Wallet - Represents a wallet object.
 * @property {number} id - The wallet ID.
 * @property {string} address - The wallet address.
 * @property {string} signature - The wallet signature.
 * @property {boolean} main - Indicates if this is the main wallet.
 */
interface WalletState {
  list: Wallet[];
  current: Wallet | null;
  main: Wallet | null;
}

/**
 * @typedef {Object} WalletState - Represents the state of the wallet slice.
 * @property {Wallet[]} list - The list of wallets.
 * @property {Wallet|null} current - The current wallet.
 * @property {Wallet|null} main - The main wallet.
 */

const initialState: WalletState = {
  list: [],
  current: null,
  main: null,
};

export const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    setCurrentWallet: (state, action) => {
      state.current = action.payload;
    },
    setWalletList(state, action) {
      const list = action.payload;
      state.list = list;
      state.main = list.length
        ? list.find((wallet: Wallet) => wallet.main) || list[0]
        : null;
    },
    clear: (state) => {
      state.list = [];
      state.current = null;
      state.main = null;
    },
  },
});

export const { setCurrentWallet, clear, setWalletList } =
  walletSlice.actions;

export default walletSlice;
