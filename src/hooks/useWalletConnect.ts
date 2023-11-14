import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";

export default function useWalletConnect() {
  const { open } = useWeb3Modal();
  const { isConnected, address } = useAccount({
    onDisconnect: () => {
      open(); //open the modal again
    },
  });
  const { data, isLoading, signMessage, error } = useSignMessage();
  const { disconnect } = useDisconnect();

  return {
    isConnected,
    walletConnectAddress: address,
    openWeb3Modal: open,
    signature: data,
    signatureLoading: isLoading,
    getSignatureError: error,
    signMessage,
    disconnectWallet: disconnect,
  };
}
