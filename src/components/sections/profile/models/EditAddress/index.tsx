import { ReactElement, useMemo, useState } from "react";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import ArrowButton from "@/components/ui/button/Arrow";
import ErrorBox from "@/components/ui/ErrorBox";
// TODO: To be uncommented once WalletHeader component is implemented
// import WalletHeader from "@/components/sections/profile/WalletHeader";
import WalletButton from "./_partials/Wallet";
import { validateAddress } from "@/utilities/Address";
import { useSelector } from "@/hooks/useTypedSelector";
import { useForm } from "react-hook-form";
import { useTranslation } from "next-i18next";
import { CustomError } from "@/types/error";
import { updateWallet } from "@/store/services/wallets.service";

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
export default function EditProfile({
  show,
}: {
  show: boolean;
}): ReactElement {
  const { t } = useTranslation();
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<
    CustomError | undefined | null
  >();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [showWalletConnectionMethod, setShowWalletConnectionMethod] =
    useState(false);
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [connectionMethod, setConnectionMethod] = useState("");
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const closeModal = () => {
    setShowEditModal(false);
  };
  const openEditAddress = () => {
    setShowEditAddress(true);
  };
  const wallet = useSelector((state) => state.wallets.current);
  const currentAddress = wallet?.address;

  const onSave = async () => {
    setLoading(true);
    setError(null);

    // TODO this line will be uncommented when web3 is intergrated
    // const signature = await getSignature()
    try {
      const validAddress = validateAddress(address, wallet?.token);
      if (!validAddress) return;

      await updateWallet({
        id: wallet?.id,
        address: newAddress || address,
        // TODO:  Replace signature: "", with signature as soon as web3 is intergrated in the wallet servce
        signature: "",
        // signature
      });
      closeModal();
    } catch (err) {
      const error = err as CustomError;
      if (error.details) {
        setError(error);
      }
    } finally {
      setLoading(false);
    }
  };

  const newAddress = useMemo(() => {
    if (connectionMethod === "wallet") {
      return wallet?.address;
    }
    return address;
  }, [address, connectionMethod, wallet?.address]);

  const requireWalletConnection = useMemo(() => {
    return wallet?.require_wallet_connection || false;
  }, [wallet?.require_wallet_connection]);

  const isFirstTimeAddressSetup = useMemo(() => {
    return Boolean(!currentAddress && newAddress);
  }, [currentAddress, newAddress]);

  const isWalletConnected = useMemo(() => {
    return requireWalletConnection && !!wallet?.address;
  }, [requireWalletConnection, wallet?.address]);

  const newAddressTitle = useMemo(() => {
    if (connectionMethod === "manual") {
      return "Enter new address";
    }
    if (
      connectionMethod === "wallet" ||
      (requireWalletConnection && isFirstTimeAddressSetup)
    ) {
      return "New address";
    }

    return "";
  }, [
    connectionMethod,
    isFirstTimeAddressSetup,
    requireWalletConnection,
  ]);

  const isMatchingTheExistingOne =
    currentAddress && currentAddress === address;

  const filled = useMemo(() => {
    if (isMatchingTheExistingOne) return false;
    if (connectionMethod === "wallet")
      return validateAddress(newAddress, wallet?.token);
    return validateAddress(address, wallet?.token);
  }, [
    address,
    connectionMethod,
    isMatchingTheExistingOne,
    newAddress,
    wallet?.token,
  ]);

  const getChangeAddressText = useMemo(() => {
    return filled ? "Save Address" : "Change address";
  }, [filled]);

  return (
    <Modal show={show} onClose={closeModal}>
      <div className="px-6 pt-6">
        {/* // TODO WalletHeader will be uncomment as soon as it's implementation is megred */}
        {/* <WalletHeader wallet={wallet} /> */}
        {showWalletConnectionMethod && (
          <div>
            <p className="font-medium text-base mb-5">
              How would you like to add your address?
            </p>
            <div className="border border-solid border-gray-400 rounded-xl divide-y overflow-hidden">
              <WalletButton
                onClick={() => setConnectionMethod("manual")}
              >
                Enter address manually
              </WalletButton>

              <WalletButton
                onClick={() => setConnectionMethod("wallet")}
              >
                Connect a wallet
              </WalletButton>
            </div>
          </div>
        )}
        {/* </WalletHeader> */}
        {showWalletInfo && !showWalletConnectionMethod && (
          <div className="flex flex-col space-y-3">
            <div className="flex">
              {currentAddress ? (
                <p className="font-medium text-base">
                  Current Address:
                </p>
              ) : (
                <p className="font-medium text-base">
                  Enter Address:
                </p>
              )}

              {currentAddress ? (
                <span
                  className="font-medium cursor-pointer text-base ml-auto text-primary"
                  onClick={openEditAddress}
                >
                  Change
                </span>
              ) : (
                <></>
              )}
            </div>

            {currentAddress && (
              <>
                <p className="text-base mb-3">{currentAddress}</p>
                <div className="pb-2">
                  <p className="font-medium text-base">
                    {newAddressTitle}
                  </p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSave)}
      >
        <div className="px-6">
          {showEditAddress &&
            !showWalletConnectionMethod &&
            connectionMethod === "wallet" && (
              <Input
                /* In backticks `` because label requires a string.*/
                label={`${t("profile.edit.label.account-address")}`}
                error={errors.newAddress?.message}
                type="newAddress"
                required
                {...register("newAddress", {
                  required: "This field is required",
                  minLength: {
                    value: 2,
                    message: "The new address is too short",
                  },
                })}
              />
            )}
          {connectionMethod === "manual" && (
            <Input
              /* In backticks `` because label requires a string.*/
              label={`${t("profile.edit.label.account-address")}`}
              error={errors.address?.message}
              type="address"
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
              <p className="text-base">
                New address matches the existing one
              </p>
            </div>
          )}
          {isWalletConnected && !currentAddress && (
            <p className="text-base mb-3">{newAddress}</p>
          )}
          {error && <ErrorBox error={error} />}
        </div>
        <div className="flex items-center justify-between pt-4 pl-6 pr-2 pb-2">
          <span
            className="cursor-pointer text-sm font-medium text-primary"
            onClick={closeModal}
          >
            {t("profile.edit.close")}
          </span>

          <ArrowButton
            disabled={loading || !filled}
            loading={loading}
          >
            {getChangeAddressText}
          </ArrowButton>
        </div>
      </form>
    </Modal>
  );
}
