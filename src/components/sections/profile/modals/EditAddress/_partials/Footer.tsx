import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "react-i18next";

type Props = {
  actionButtonDisabled: boolean;
  loading: boolean;
  onClose: () => void;
  isEditing: boolean;
};

/**
 * Footer of the input address form
 * @date 10/27/2023 - 5:48:42 PM
 *
 * @export
 * @param {Props} param0
 * @param {() => void} param0.onClose
 * @param {boolean} param0.actionButtonDisabled
 * @param {boolean} param0.loading
 * @returns {*}
 */
export default function EditAdressFooter({ onClose, actionButtonDisabled, loading, isEditing }: Props) {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between pt-4 pb-2 pl-6 pr-2 -mb-6">
      <span className="text-sm font-medium cursor-pointer text-primary" onClick={onClose}>
        {t("profile.edit.close")}
      </span>

      <ArrowButton disabled={actionButtonDisabled} loading={loading}>
        {t(isEditing ? "profile.edit.wallet.button.change-address" : "profile.edit.wallet.button.save-address")}
      </ArrowButton>
    </div>
  );
}
