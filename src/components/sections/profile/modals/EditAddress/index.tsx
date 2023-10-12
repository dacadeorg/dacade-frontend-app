import { ReactElement, useEffect, useMemo, useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import ArrowButton from "@/components/ui/button/Arrow";
import ErrorBox from "@/components/ui/ErrorBox";
import WalletHeader from "@/components/sections/profile/WalletHeader";
import WalletButton from "./_partials/Wallet";
import { validateAddress } from "@/utilities/Address";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { CustomError } from "@/types/error";
import { fetchAllWallets, updateWallet } from "@/store/services/wallets.service";
import { Wallet } from "@/types/wallet";
import { connectWallet, disconnectWallet, getSignature } from "@/store/feature/wallet.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { IRootState } from "@/store";
import { clearCurrentWallet } from "@/store/feature/user/wallets.slice";

/**
 * Inferface for form's inputs values
 * @date 5/3/2023 - 3:14:14 PM
 *
 * @interface FormValues
 * @typedef {FormValues}
 */
interface FormValues {
  address: string;
  newAddress: string;
  onClose: (value: boolean) => void;
}
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
 * @param {{
  show: boolean;
}} {
  show,
}
 * @returns {ReactElement}
 */
export default function EditProfile({ show, wallet, onClose }: EditProfileProps): ReactElement {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<CustomError | undefined | null>();
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showWalletConnectionMethod, setShowWalletConnectionMethod] = useState(false);
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState("");
  const {
    watch,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();
  const address = watch("newAddress");
  const formAddress = watch("address");

  const dispatch = useDispatch();

  const closeModal = () => {
    clearState();
    onClose();
  };

  const clearState = () => {
    setShowEditAddress(false);
    setShowWalletConnectionMethod(false);
    setConnectionMethod("");
    setShowWalletInfo(false);
    setError(null);
    setValue("newAddress", "");
    setValue("address", "");
    dispatch(clearCurrentWallet());
  };

  const openEditAddress = () => {
    setShowWalletConnectionMethod(true);
    setShowEditAddress(true);
    setConnectionMethod("manual");
  };

  const { wallets, web3Adrress } = useMultiSelector<unknown, { wallets: Wallet; web3Adrress: string | null }>({
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
      setShowWalletInfo(false);
      return connect();
    }
    setShowWalletInfo(true);
  };

  const disconnect = async () => {
    await dispatch(disconnectWallet());
  };

  const connect = async () => {
    try {
      await dispatch(connectWallet());
      setShowEditAddress(true);
    } catch (e) {
      console.log(e);
      openEditAddress();
    }
  };

  const onSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const validAddress = validateAddress(address || newAddress, wallets?.token);
      if (!validAddress) {
        setError({ name: "Failed validation", message: "Message", details: { message: "address does not match any of the allowed types" } });
        return;
      }
      const signature = await getSignature();
      if (signature) {
        await dispatch(
          updateWallet({
            id: wallets?.id,
            address: address || newAddress,
            signature,
          })
        );
      } else setError({ name: "Failed validation", message: "Message", details: { message: "Failed to get the signature" } });

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

  const newAddress = useMemo(() => {
    if (connectionMethod === "wallet") return wallets?.address;
    else if (connectionMethod === "manual") return formAddress;
    return address;
  }, [address, connectionMethod, wallets?.address, formAddress]);

  const requireWalletConnection = useMemo(() => {
    return wallets?.require_wallet_connection || false;
  }, [wallets?.require_wallet_connection]);

  const isFirstTimeAddressSetup = useMemo(() => {
    return Boolean(!currentAddress && !newAddress);
  }, [currentAddress, newAddress]);

  const isWalletConnected = useMemo(() => {
    return requireWalletConnection && !!wallet?.address;
  }, [requireWalletConnection, wallet?.address]);

  const showForm = useMemo(() => {
    return showEditAddress && !showWalletConnectionMethod && connectionMethod;
  }, [connectionMethod, showEditAddress, showWalletConnectionMethod]);

  const newAddressTitle = useMemo(() => {
    if (connectionMethod === "manual") {
      return "Enter new address";
    }
    if (connectionMethod === "wallet" || (requireWalletConnection && isFirstTimeAddressSetup)) {
      return "New address";
    }

    return "";
  }, [connectionMethod, isFirstTimeAddressSetup, requireWalletConnection]);

  const isMatchingTheExistingOne = useMemo(() => {
    if (!newAddress || !currentAddress) return false;
    return currentAddress?.toLocaleLowerCase() === newAddress?.toLocaleLowerCase();
  }, [currentAddress, newAddress]);

  const filled = useMemo(() => {
    setError(null);
    if (isMatchingTheExistingOne) return false;
    if (!isFirstTimeAddressSetup && (connectionMethod === "wallet" || connectionMethod === "manual")) return validateAddress(newAddress, wallet?.token);
    return validateAddress(address, wallet?.token);
  }, [address, connectionMethod, isMatchingTheExistingOne, newAddress, wallet?.token, isFirstTimeAddressSetup]);

  const getChangeAddressText = useMemo(() => {
    if (filled || currentAddress || isFirstTimeAddressSetup) return t("profile.edit.wallet.button.save-address");
    return t("profile.edit.wallet.button.change-address");
  }, [currentAddress, filled, t, isFirstTimeAddressSetup]);

  useEffect(() => {
    if (currentAddress) {
      setShowWalletInfo(true);
    } else if (isFirstTimeAddressSetup) {
      setShowWalletConnectionMethod(true);
      setShowWalletInfo(false);
    }
  }, [currentAddress, isFirstTimeAddressSetup]);

  useEffect(() => {
    if (web3Adrress) setValue("newAddress", web3Adrress);
  }, [web3Adrress]);

  return (
    <Modal show={show} onClose={closeModal}>
      <div className="px-6 pt-6">
        <WalletHeader wallet={wallet}>
          {showWalletConnectionMethod ? (
            <div>
              <p className="mb-5 text-base font-medium">{t("profile.edit.wallet.select.title")}</p>
              <div className="overflow-hidden border border-gray-400 border-solid divide-y rounded-xl">
                <WalletButton onClick={() => setWalletConnectionMethod("manual")}>{t("profile.edit.wallet.select.option.manual")}</WalletButton>
                {requireWalletConnection && <WalletButton onClick={() => setWalletConnectionMethod("wallet")}>{t("profile.edit.wallet.select.option.connect")}</WalletButton>}
              </div>
            </div>
          ) : (
            <></>
          )}
        </WalletHeader>
        {showWalletInfo && !showWalletConnectionMethod && (
          <div className="flex flex-col space-y-3">
            <div className="flex">
              {currentAddress ? (
                <p className="text-base font-medium">{t("profile.edit.wallet.current.address")}</p>
              ) : (
                <p className="text-base font-medium">{t("profile.edit.wallet.input.label.manual")}:</p>
              )}

              {currentAddress ? (
                <span className="ml-auto text-base font-medium cursor-pointer text-primary" onClick={openEditAddress}>
                  {t("profile.edit.wallet.button.change")}
                </span>
              ) : (
                <></>
              )}
            </div>

            {currentAddress && (
              <>
                <p className="mb-3 text-base">{currentAddress}</p>
                <div className="pb-2">
                  <p className="text-base font-medium">{newAddressTitle}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit(onSave)}>
        <div className="px-6">
          {showForm && connectionMethod === "wallet" && (
            <Input
              /* In backticks `` because label requires a string.*/
              label={`${t("profile.edit.label.account-address")}`}
              error={errors.newAddress?.message}
              type="text"
              required
              // value={addressValue}
              {...register("newAddress", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "The new address is too short",
                },
              })}
            />
          )}
          {showForm && connectionMethod === "manual" && (
            <Input
              label={`${t("profile.edit.label.account-address")}`}
              error={errors.address?.message}
              type="text"
              required
              {...register("address", {
                required: "This field is required",
                minLength: {
                  value: 2,
                  message: "The address is too short",
                },
              })}
            />
          )}
          {isMatchingTheExistingOne && (
            <div className="pt-4">
              <p className="text-base">{t("profile.edit.wallet.error.matches-existing")}</p>
            </div>
          )}
          {isWalletConnected && !currentAddress && <p className="mb-3 text-base">{newAddress}</p>}
          {error && <ErrorBox error={error} />}
        </div>
        <div className="flex items-center justify-between pt-4 pb-2 pl-6 pr-2">
          <span className="text-sm font-medium cursor-pointer text-primary" onClick={closeModal}>
            {t("profile.edit.close")}
          </span>

          <ArrowButton disabled={loading || !filled} loading={loading}>
            {getChangeAddressText}
          </ArrowButton>
        </div>
      </form>
    </Modal>
  );
}
