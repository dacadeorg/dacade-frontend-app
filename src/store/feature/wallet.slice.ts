import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { providers } from "ethers";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { SIGNATURE_HASH_STRING } from "@/constants/wallet";

const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";

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
      provider = null;
    },
  },
});

export const { clearWeb3WalletState, setWeb3WalletData, setConnectWallet, setChainId, setNetworkName, setWeb3Address } = web3WalletSlice.actions;

/**
 * Web3 provider options
 * @date 5/10/2023 - 5:38:57 PM
 *
 * @type {{ walletconnect: { package: any; options: { infuraId: string; }; }; }}
 */
const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID, // required
    },
  },
};

let web3Modal: Web3Modal | null = null;
let provider: any = null;
let currentChainId = null;

if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet", // optional
    cacheProvider: true,
    providerOptions, // required
  });
}

/**
 * Connect wallet action
 * @date 5/10/2023 - 5:39:18 PM
 *
 * @type {*}
 */
export const connectWallet = createAsyncThunk("web3/connect", async (_, { dispatch }) => {
  provider = await web3Modal?.connect();
  dispatch(setConnectWallet(true));

  // We plug the initial `provider` into ethers.js and get back
  // a Web3Provider. This will add on methods from ethers.js and
  // event listeners such as `.on()` will be different.
  const web3Provider = new providers.Web3Provider(provider);
  const signer = web3Provider.getSigner();
  const address = await signer.getAddress();
  const network = await web3Provider.getNetwork();
  const networkName = network.name;
  currentChainId = network.chainId;
  await dispatch(subscribeProvider());

  const data = {
    address,
    chainId: currentChainId,
    networkName,
  };

  dispatch(setWeb3WalletData(data));
  return data;
});

/**
 * Get wallet signature action
 * @date 5/10/2023 - 5:39:45 PM
 *
 * @type {*}
 */
export const getSignature = async () => {
  if (!web3Modal) return;
  if (!provider) provider = await web3Modal?.connect();
  const web3Provider = new providers.Web3Provider(provider);
  try {
    const signer = web3Provider.getSigner();
    const signature = await signer.signMessage(SIGNATURE_HASH_STRING);
    return signature;
  } catch (error) {
    return;
  }
};

/**
 * Disconnect wallet action
 * @date 5/10/2023 - 5:42:39 PM
 *
 * @type {*}
 */
export const disconnectWallet = createAsyncThunk("web3/disconnect", async (_, { dispatch }) => {
  if (!web3Modal) return;
  // const provider_ = await web3Modal.cachedProvider;
  await web3Modal.clearCachedProvider();
  if (provider?.disconnect && typeof provider.disconnect === "function") {
    await provider.disconnect();
  }
  dispatch(clearWeb3WalletState());
  dispatch(setConnectWallet(false));
});

/**
 * Check wallet action
 * @date 5/10/2023 - 5:42:56 PM
 *
 * @type {*}
 */
export const check = createAsyncThunk("web3/check", async (_, { dispatch }) => {
  if (web3Modal && web3Modal.cachedProvider) {
    await dispatch(connectWallet());
  }
});

/**
 * Subscribe to the wallet action
 * @date 5/10/2023 - 5:43:10 PM
 *
 * @type {*}
 */
export const subscribeProvider = createAsyncThunk("web3/subscribeProvider", async (_, { dispatch }) => {
  if (!provider?.on) return;
  provider.on("disconnect", () => dispatch(disconnectWallet()));
  provider.on("accountsChanged", async (accounts: string | any[]) => {
    if (!accounts.length) return dispatch(disconnectWallet());
    setWeb3WalletData(accounts[0]);
  });

  provider.on("chainChanged", async (chainId: string) => {
    currentChainId = chainId;
    setChainId(chainId);
    const { name } = await new providers.Web3Provider(provider).getNetwork();
    setNetworkName(name);
  });
});

export default web3WalletSlice;
