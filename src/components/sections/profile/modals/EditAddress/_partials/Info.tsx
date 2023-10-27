import { useMemo } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  address: string;
  onClick: () => void;
  connectionMethod: string;
};

/**
 * Display info of the wallet
 * @date 10/27/2023 - 5:52:17 PM
 *
 * @export
 * @param {Props} param0
 * @param {string} param0.address
 * @param {() => void} param0.onClick
 * @param {string} param0.connectionMethod
 * @returns {*}
 */
export function WalletInfo({ address, onClick, connectionMethod }: Props) {
  const { t } = useTranslation();

  const newAddressTitle = useMemo(() => {
    if (connectionMethod === "manual") return "Enter new address";
    if (connectionMethod === "wallet") return "New address";
    return "";
  }, [connectionMethod]);

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex">
        <p className="text-base font-medium">{t(address ? "profile.edit.wallet.current.address" : "profile.edit.wallet.input.label.manual")}</p>

        {address && (
          <span className="ml-auto text-base font-medium cursor-pointer text-primary" onClick={onClick}>
            {t("profile.edit.wallet.button.change")}
          </span>
        )}
      </div>

      {address && (
        <>
          <p className="mb-3 text-base">{address}</p>
          <div className="pb-2">
            <p className="text-base font-medium">{newAddressTitle}</p>
          </div>
        </>
      )}
    </div>
  );
}
