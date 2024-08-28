import { useTranslation } from "next-i18next";
import { ReactElement, useMemo } from "react";



interface AddressDisplayProps {
  walletAddress: string;
  description: string;
  triggerEditAddress: () => void;
}
/**
 * Address display component
 *
 * @returns {ReactElement}
 */
export default function AddressDisplay({ walletAddress, description, triggerEditAddress }: AddressDisplayProps): ReactElement {
  const { t } = useTranslation();
  const address = useMemo(() => (walletAddress ? walletAddress.match(/.{1,4}/g) : null), [walletAddress]);
  return (
    <div className="text-sm text-gray-700">
      {address ? (
        <p className="leading-5 text-sm flex gap-x-2 gap-y-1 flex-wrap font-mono font-normal">
          {address.map((part, index) => (
            <span key={`address-${index}`} className="mr-2">
              {part}
            </span>
          ))}
        </p>
      ) : (
        <p>{description}</p>
      )}
      <div className="text-gray-700 text-sm mt-3">
        <span className="cursor-pointer hover:underline" onClick={triggerEditAddress}>
          {address ? t("profile.wallets.address-change") : t("profile.wallets.address-set")}
        </span>
      </div>
    </div>
  );
}
