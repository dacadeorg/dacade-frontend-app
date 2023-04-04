import api from "@/plugins/api";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

/**
 * Fetches all wallets.
 *
 * @returns {Promise<Wallet[]>} - The list of wallets.
 */
export const allWallets = createAsyncThunk(
  "wallets/all",
  async () => {
    const { data } = await api().get<Wallet[]>("wallets");
    return data;
  }
);

/**
 * Updates a wallet.
 *
 * @param {Object} payload - The payload for the updateWallet action.
 * @param {number} payload.id - The ID of the wallet to update.
 * @param {string} payload.address - The new address for the wallet.
 * @param {string} payload.signature - The new signature for the wallet.
 * @returns {Promise<Wallet[]>} - The updated list of wallets.
 */

export const updateWallet = createAsyncThunk(
  "wallets/update",
  async (
    payload: {
      id: number;
      address: string;
      signature: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await api().patch(
        `wallets/update/${payload.id}`,
        payload
      );
      return data;
    } catch (err) {
      rejectWithValue(err);
    }
  }
);

export const walletSlice = createSlice({
  name: "wallets",
  initialState,
  reducers: {
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    clear: (state) => {
      state.list = [];
      state.current = null;
      state.main = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(allWallets.fulfilled, (state, action) => {
        state.list = action.payload;
        state.main = action.payload.length
          ? action.payload.find((wallet: Wallet) => wallet.main) ||
            action.payload[0]
          : null;
      })
      .addCase(updateWallet.fulfilled, (state, action) => {
        state.list = action.payload;
        state.main = action.payload.length
          ? action.payload.find((wallet: Wallet) => wallet.main) ||
            action.payload[0]
          : null;
      });
  },
});

export const { setCurrent, clear } = walletSlice.actions;

export default walletSlice;
