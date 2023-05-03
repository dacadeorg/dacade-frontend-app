import { ReactElement } from "react";
import { useTranslation } from "next-i18next";
import Tag from "@/components/ui/Tag";

interface WalletHeaderProps {
  wallet: {
    title: string;
    address: string;
    token: string;
  };
}

export default function WalletHeader({
  wallet,
}: WalletHeaderProps): ReactElement {
    const {t} = useTranslation()
  return (
    <div className="pb-7">
      <p className="text-.5xl leading-snug font-medium">
        {wallet.title}
      </p>
      <p className="text-.5xl font-medium text-gray-400 leading-snug">
        {wallet.address ? "Change" : "Set"} {t("Address")}
      </p>
      <Tag value={wallet.token} className="text-gray-500 mt-2" />
    </div>
  );
}
