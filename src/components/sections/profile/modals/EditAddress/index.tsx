import WalletHeader from "@/components/sections/profile/WalletHeader";
import Modal from "@/components/ui/Modal";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { IRootState } from "@/store";
import { clearCurrentWallet } from "@/store/feature/user/wallets.slice";
import { fetchAllWallets, updateWallet } from "@/store/services/wallets.service";
import { CustomError } from "@/types/error";
import { Wallet } from "@/types/wallet";
import { validateAddress } from "@/utilities/Address";
import { ReactElement, useEffect, useMemo, useState } from "react";
import WalletAddressChangeForm from "./_partials/Form";
import { WalletInfo } from "./_partials/Info";
import SelectWalletConnectionMethod from "./_partials/SelectConnectionMethod";
import { useWeb3Modal } from "@web3modal/wagmi/react";
import { useAccount, useDisconnect } from "wagmi";

/**
 * Interface for the edit profile props
 *
 * @interface EditProfileProps
 * @typedef {EditProfileProps}
 */
interface EditProfileProps {
  show: boolean;
  wallet: Wallet;
  onClose: () => void;
}

/**
 * Edit profile component
 * @date 5/3/2023 - 3:15:02 PM
 *
 * @export
  show: boolean;
}} {
  show,
}
 * @returns {ReactElement}
 */
export default function EditProfile({ show, wallet, onClose }: EditProfileProps): ReactElement {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CustomError | undefined | null>();

  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showWalletConnectionMethod, setShowWalletConnectionMethod] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState("");

  const { open: openWalletConnectModal } = useWeb3Modal();
  const dispatch = useDispatch();
  const { disconnect: disconnectWallet } = useDisconnect();
  const { isConnected } = useAccount();

  const closeModal = () => {
    clearState();
    onClose();
  };

  const clearState = () => {
    setShowEditAddress(false);
    setShowWalletConnectionMethod(false);
    setConnectionMethod("");
    dispatch(clearCurrentWallet());
  };

  const openEditAddress = () => {
    setShowWalletConnectionMethod(true);
    setShowEditAddress(true);
    setConnectionMethod("manual");
  };

  const { wallets } = useMultiSelector<unknown, { wallets: Wallet; web3Adrress: string | null }>({
    wallets: (state: IRootState) => state.wallets.current,
    web3Adrress: (state: IRootState) => state.web3Wallet.address,
  });

  const currentAddress = wallets?.address;

  const setWalletConnectionMethod = (method: string) => {
    setShowWalletConnectionMethod(false);
    if (!method) return;

    if (method === "wallet" && !requireWalletConnection) return;

    if (isWalletConnected) disconnect();

    setConnectionMethod(method);
    setShowEditAddress(true);

    if (method === "wallet") {
      return connect();
    }
  };

  const disconnect = async () => {
    await disconnectWallet();
  };

  const connect = async () => {
    try {
      openWalletConnectModal();
      setShowEditAddress(true);
    } catch (e) {
      console.log(e);
      openEditAddress();
    }
  };

  const onSave = async (address: string) => {
    setLoading(true);
    setError(null);

    try {
      const validAddress = validateAddress(address, wallets?.token);
      if (!validAddress) {
        setError({ name: "Failed validation", message: "Message", details: { message: "address does not match any of the allowed types" } });
        return;
      }
      await dispatch(
        updateWallet({
          id: wallets?.id,
          address: address,
        })
      );

      await dispatch(fetchAllWallets());
      closeModal();
    } catch (err) {
      const error = err as CustomError;
      if (error.details) {
        setError(error);
      } else setError({ name: "Wallet connection failed", message: "Failed connection", details: { one: "Unable to connect wallet" } });
    } finally {
      setLoading(false);
    }
  };

  const requireWalletConnection = useMemo(() => {
    return wallets?.require_wallet_connection || false;
  }, [wallets?.require_wallet_connection]);

  const isWalletConnected = useMemo(() => {
    return isConnected || (requireWalletConnection && !!wallet?.address);
  }, [requireWalletConnection, wallet?.address, isConnected]);

  const showForm = useMemo(() => {
    return Boolean(showEditAddress && !showWalletConnectionMethod && connectionMethod);
  }, [connectionMethod, showEditAddress, showWalletConnectionMethod]);

  useEffect(() => {
    if (!currentAddress) {
      setShowWalletConnectionMethod(true);
    }
  }, [currentAddress]);

  return (
    <Modal show={show} onClose={closeModal}>
      <div className="px-6">
        <WalletHeader wallet={wallet} />
        {showWalletConnectionMethod && <SelectWalletConnectionMethod enableWalletConnection={requireWalletConnection} onSelect={setWalletConnectionMethod} />}

        {!showWalletConnectionMethod && <WalletInfo address={currentAddress} connectionMethod={connectionMethod} onClick={openEditAddress} />}
      </div>
      <WalletAddressChangeForm
        show={showForm}
        onSave={onSave}
        currentAddress={currentAddress}
        loading={loading}
        error={error}
        token={wallet?.token}
        connectionMethod={connectionMethod}
        closeModal={closeModal}
        clearError={() => setError(null)}
      />
    </Modal>
  );
}
