import { createWeb3Modal } from "@web3modal/wagmi/react";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { walletConnectProvider } from "@web3modal/wagmi";

const projectId = "460f40a260564ac4a4f4b3fffb032dad";
const metadata = {
  name: "Dacade",
  description: "Peer to peer learning platform",
  url: "https://dacade.org/",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const { chains, publicClient } = configureChains([polygonMumbai], [walletConnectProvider({ projectId }), publicProvider()]);
export const config = createConfig({
  autoConnect: true,
  connectors: [new WalletConnectConnector({ chains, options: { projectId, showQrModal: false, metadata } }), new InjectedConnector({ chains, options: { shimDisconnect: true } })],
  publicClient,
});

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  chains,
  themeVariables: {
    "--w3m-z-index": 1000,
  },
});
