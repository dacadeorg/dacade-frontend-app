import { ReactElement, ReactNode } from "react";
import { useTranslation } from "next-i18next";
import Tag from "@/components/ui/Tag";
import { Wallet } from "@/types/wallet";

/**
 * Type for the wallet Header Props
 * @date 5/19/2023 - 12:04:40 PM
 *
 * @interface WalletHeaderProps
 * @typedef {WalletHeaderProps}
 */
interface WalletHeaderProps {
  wallet: Wallet;
  children?: ReactNode;
}
/**
 * Wallet header component
 * @returns {ReactElement}
 */
export default function WalletHeader({ wallet, children }: WalletHeaderProps): ReactElement {
  const { t } = useTranslation();
  return (
    <>
      <div className="pb-7">
        <p className="text-.5xl leading-snug font-medium">{wallet.title}</p>
        <p className="text-.5xl font-medium text-gray-400 leading-snug">
          {wallet.address ? "Change" : "Set"} {t("Address")}
        </p>
        <Tag value={wallet.token} className="mt-2 text-gray-500" />
      </div>
      {children}
    </>
  );
}
