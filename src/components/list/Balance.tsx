import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import BalanceCard from "@/components/cards/Balance";
import { IRootState } from "@/store";
import { Wallet } from "@/types/wallet";
import { useTranslation } from "next-i18next";

/**
 * Balance list component
 * @date 4/4/2023 - 10:48:27 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function BalanceList(): ReactElement {
  const { t } = useTranslation();
  const wallets = useSelector(
    (state: IRootState) => state.wallets.list
  );

  return (
    <div className="text-left">
      <span className="uppercase block text-xs font-semibold text-gray-500 leading-relaxed">
        {t("nav.balance")}
      </span>
      <div className="space-y-4 mt-2">
        {wallets.map((wallet: Wallet) => (
          <BalanceCard key={wallet.id} details={wallet} />
        ))}
      </div>
    </div>
  );
}
