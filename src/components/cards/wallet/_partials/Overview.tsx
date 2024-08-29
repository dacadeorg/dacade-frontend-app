import Coin from "@/components/ui/Coin";
import Tag from "@/components/ui/Tag";
import Currency from "@/components/ui/Currency";
import { Wallet } from "@/types/wallet";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

interface OverviewProps {
  wallet: Wallet;
  testId?: string;
}

/**
 * Wallet overview component
 *
 * @returns {ReactElement}
 */
export default function Overview({ wallet, testId = "overviewId" }: OverviewProps): ReactElement {
  const { t } = useTranslation();
  return (
    <div className="bg-secondary lg:w-60 md:w-60 sm:w-60 rounded-3.5xl" data-testid={testId}>
      <div className="p-6">
        <div className="border-b border-dotted border-gray-900">
          <h1 className="text-2xl">{wallet.title}</h1>
          <Tag value={wallet.token} />
          <div className="text-right mb-4">
            <Coin size="medium" token={wallet.token} />
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 pt-5 text-sm">
            <h1>{t("profile.wallets.balance")}</h1>
          </div>
          <div className="w-1/2 pt-3.5 text-right text-2xl font-medium">
            <h1>
              <Currency value={wallet.balance} />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
