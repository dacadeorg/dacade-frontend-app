import { createSlice } from "@reduxjs/toolkit";

// const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

interface InitialState {
  address: string | null;
  chainId: number | null;
  networkName: string | null;
  provider: string | null;
  connected: boolean;
}

const initialState: InitialState = {
  address: null,
  chainId: null,
  networkName: null,
  provider: null,
  connected: false,
};

/**
 * Web3 wallet slice for handling state for the user wallet
 * @date 5/10/2023 - 5:37:12 PM
 *
 * @type {Slice}
 */
export const web3WalletSlice = createSlice({
  name: "web3Wallet",
  initialState,
  reducers: {
    setWeb3Address: (state, action) => {
      state.address = action.payload;
    },
    setChainId: (state, action) => {
      state.chainId = action.payload;
    },
    setNetworkName: (state, action) => {
      state.networkName = action.payload;
    },
    setConnectWallet: (state, action) => {
      state.connected = action.payload;
    },

    setWeb3WalletData: (state, action) => {
      state.address = action.payload.address;
      state.chainId = action.payload.chainId;
      state.networkName = action.payload.networkName;
    },
    clearWeb3WalletState: (state) => {
      state.address = null;
      state.chainId = null;
      state.networkName = null;
    },
  },
});

export const { clearWeb3WalletState, setWeb3WalletData, setConnectWallet, setChainId, setNetworkName, setWeb3Address } = web3WalletSlice.actions;

export default web3WalletSlice;
