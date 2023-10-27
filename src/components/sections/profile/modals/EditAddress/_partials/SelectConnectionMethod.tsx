import WalletButton from "./Button";
import { useTranslation } from "next-i18next";

type Props = {
    enableWalletConnection?: boolean;
    onSelect: (method: string) => void;
}


export default function SelectWalletConnectionMethod({ onSelect, enableWalletConnection }: Props) {
    const { t } = useTranslation();
    return (
        <div className="grid gap-2.5">
            <p className="mb-2 text-base font-medium">{t("profile.edit.wallet.select.title")}</p>
            <div className="overflow-hidden border border-gray-200 border-solid divide-y rounded-xl">
                <WalletButton onClick={() => onSelect("manual")}>{t("profile.edit.wallet.select.option.manual")}</WalletButton>
                {enableWalletConnection && <WalletButton onClick={() => onSelect("wallet")}>{t("profile.edit.wallet.select.option.connect")}</WalletButton>}
            </div>
        </div>
    )
}
