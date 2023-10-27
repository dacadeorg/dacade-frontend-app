import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "react-i18next";

type Props = {
    actionButtonDisabled: boolean;
    loading: boolean;
    onClose: () => void
}


export default function EditAdressFooter({ onClose, actionButtonDisabled, loading }: Props) {
    const { t } = useTranslation();
    return (
        <div className="flex items-center justify-between pt-4 pb-2 pl-6 pr-2 -mb-6">
            <span className="text-sm font-medium cursor-pointer text-primary" onClick={onClose}>
                {t("profile.edit.close")}
            </span>

            <ArrowButton disabled={actionButtonDisabled} loading={loading}>
                {t("profile.edit.wallet.button.save-address")}
            </ArrowButton>
        </div>
    )
}
