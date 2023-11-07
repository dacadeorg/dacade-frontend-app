import { createWeb3Modal } from "@web3modal/wagmi/react";
import { publicProvider } from "wagmi/providers/public";
import { configureChains, createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { walletConnectProvider } from "@web3modal/wagmi";

// #TODO: use Dacade's infura KEY to 460f40a260564ac4a4f4b3fffb032dad
const projectId = "d8aaadc6360d76bdc9fb5793d85d9e69";
const metadata = {
  name: "Dacade",
  description: "Peer to peer learning platform",
  url: "https://dacade.org/",
  icons: ["https://asset.cloudinary.com/dl1vj7yr9/8b5ea898819e51aef029c7b7971f1168"],
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
