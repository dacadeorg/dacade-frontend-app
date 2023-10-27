import ErrorBox from "@/components/ui/ErrorBox";
import Input from "@/components/ui/Input";
import { useSelector } from "@/hooks/useTypedSelector";
import { CustomError } from "@/types/error";
import { validateAddress } from "@/utilities/Address";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import EditAdressFooter from "./Footer";


type Props = {
    connectionMethod: string;
    currentAddress: string;
    token: string;
    loading: boolean;
    closeModal: () => void
    onSave: (address: string) => Promise<void>
    error: CustomError | undefined | null;
    clearError: () => void;
    show: boolean;
}

/**
 * Inferface for form's inputs values
 * @date 5/3/2023 - 3:14:14 PM
 *
 * @interface FormValues
 * @typedef {FormValues}
 */
interface FormValues {
    address: string;
    onClose: (value: boolean) => void;
}

export default function WalletAddressChangeForm({ connectionMethod, currentAddress, token, closeModal, onSave, loading, error, clearError, show }: Props) {
    const { t } = useTranslation();
    const {
        watch,
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValues>();

    const web3Adrress = useSelector((state) => state.web3Wallet.address);



    const address = watch("address");

    const isMatchingTheExistingOne = useMemo(() => {
        if (!address || !currentAddress) return false;
        return currentAddress?.toLocaleLowerCase() === address?.toLocaleLowerCase();
    }, [currentAddress, address]);

    const filled = useMemo(() => {
        if (isMatchingTheExistingOne) return false;
        return validateAddress(address, token);
    }, [isMatchingTheExistingOne, address, token]);

    useEffect(() => {
        if (web3Adrress && connectionMethod == 'wallet') setValue("address", web3Adrress);
    }, [connectionMethod, setValue, web3Adrress]);

    const save = () => onSave(address);

    const clear = () => {
        setValue("address", "");
        clearError();
    };

    useEffect(() => {
        if (!show) clear();
    }, [show]);

    return (
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit(save)}>
            {show && (<div className="px-6">
                <Input
                    /* In backticks `` because label requires a string.*/
                    label={`${t("profile.edit.label.account-address")}`}
                    error={errors.address?.message}
                    type="text"
                    required
                    disabled={connectionMethod === 'wallet'}
                    // value={addressValue}
                    {...register("address", {
                        required: "This field is required",
                        minLength: {
                            value: 2,
                            message: "The new address is too short",
                        },
                    })}
                />
                {isMatchingTheExistingOne && (
                    <div className="pt-2">
                        <p className="text-base text-red-600">{t("profile.edit.wallet.error.matches-existing")}</p>
                    </div>
                )}
                {error && <ErrorBox error={error} />}
            </div>)}
            <EditAdressFooter onClose={closeModal} loading={loading} actionButtonDisabled={!filled || loading || !show} />
        </form>
    )
}
