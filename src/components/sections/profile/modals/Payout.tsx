import { ReactElement, useState } from "react";
import Modal from "@/components/ui/Modal";
import Tag from "@/components/ui/Tag";
import Coin from "@/components/ui/Coin";
import Currency from "@/components/ui/Currency";
import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
import { Wallet } from "@/types/wallet";

/**
 * Payout interface
 * @date 5/3/2023 - 1:00:02 PM
 *
 * @interface PayoutProps
 * @typedef {PayoutProps}
 */
interface PayoutProps {
  show: boolean;
  wallet: Wallet;
  onClose: (event: any) => void;
}

export default function Payout({
  show,
  wallet,
  onClose,
}: PayoutProps): ReactElement {
  const [loading, setLoading] = useState(false);

  const save = () => {
    setLoading(true);
    // TODO: dispatch action to create payout
    setLoading(false);
    onClose(true);
  };

  const { t } = useTranslation();

  return (
    <Modal show={show} onClose={onClose}>
      <div className="relative px-6 pt-6">
        <div className="mb-6">
          <p className="text-.5xl leading-snug font-medium">
            {wallet.title}
          </p>
          <p className="text-.5xl font-medium text-gray-400 leading-snug">
            {t("profile.wallet.payout.request")}
          </p>
          <Tag className="text-gray-500" value={wallet.token} />
        </div>
        <div className="border-b border-dotted">
          <div className="mb-4 text-right">
            <Coin size="medium" token={wallet.token} />
          </div>
        </div>
        <div className="flex mb-8">
          <div className="w-1/2 pt-5 text-sm">
            <h1>{t("profile.wallet.payout.amount")}</h1>
          </div>
          <div className="w-1/2 pt-3.5 text-right text-2xl font-medium">
            <h1>
              <Currency value={wallet.balance} />
            </h1>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between pb-2 pl-6 pr-2">
        <span
          className="text-sm font-medium cursor-pointer text-primary"
          onClick={() => onClose(true)}
        >
          {t("profile.edit.close")}
        </span>
        <ArrowButton
          loading={loading}
          disabled={loading}
          variant="outline-primary"
          onClick={save}
        >
          {t("profile.wallet.payout.send")}
        </ArrowButton>
      </div>
    </Modal>
  );
}
