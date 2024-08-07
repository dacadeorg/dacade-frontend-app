import { Wallet } from "@/types/wallet";
import Currency from "@/components/ui/Currency";
import Hint from "@/components/ui/Hint";
import { useTranslation } from "next-i18next";

interface HintProps {
  wallet: Wallet;
}
export default function WalletHint({ wallet }: HintProps) {
  const { t } = useTranslation();
  return (
    <>
      {wallet.payouts.map((payout, i) => (
        <Hint key={`wallet-payout-${i}`} className="mt-2">
          <span className="font-medium">
            <Currency value={payout.amount} token={payout.token} />
          </span>{" "}
          {t("profile.wallet.payout.text")}
        </Hint>
      ))}
    </>
  );
}
