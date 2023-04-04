import { useSelector } from "react-redux";
import BalanceCard from "@/components/cards/Balance";
import { useTranslation } from "react-i18next";
import { ReactElement } from "react";
import wallet from "@/types/balance";

/**
 * Balance card props
 * @date 4/3/2023 - 1:14:52 PM
 *
 * @interface BalanceListProps
 * @typedef {BalanceListProps}
 */
interface BalanceListProps {
  value?: number;
}

/**
 * Function that return Balance card component
 * @date 4/3/2023 - 1:15:06 PM
 *
 * @export
 * @param {BalanceListProps} {
  value = 0,
}
 * @returns {ReactElement}
 */
export default function BalanceList({
  value = 0,
}: BalanceListProps): ReactElement {
  // TODO; to remove any when the types for state are available, i suppose after postman file arrives
  const wallets: wallet[] = useSelector(
    (state: any) => state.user.wallets.list
  );

  const { t } = useTranslation();

  return (
    <div className="text-left">
      <span className="uppercase block text-xs font-semibold text-gray-500 leading-relaxed">
        {t("nav.balance")}
      </span>
      <div className="space-y-4 mt-2">
        {wallets.map((wallet) => (
          <BalanceCard key={wallet.id} details={wallet} />
        ))}
      </div>
    </div>
  );
}
