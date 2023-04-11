import { ReactElement } from "react";
import Link from "next/link";
import Coin from "@/components/ui/Coin";
import Currency from "@/components/ui/Currency";
import { truncateAddress } from "@/utilities/Address";
import { Wallet } from "@/types/wallet";

/**
 * Interface for balance card props
 * @date 3/29/2023 - 1:19:22 PM
 *
 * @interface BalanceProps
 * @typedef {BalanceProps}
 */
interface BalanceProps {
  details: Wallet;
}

/**
 * Balance card
 * @date 3/29/2023 - 1:19:02 PM
 *
 * @export
 * @param {BalanceProps} {
  details,
}
 * @returns {ReactElement}
 */
export default function Balance({
  details,
}: BalanceProps): ReactElement {
  const address = details.address
    ? truncateAddress(details.address, details.token)
    : null;

  return (
    <Link href={`/profile/wallets`}>
      <div className="flex px-5 py-3 -mx-5 space-x-3 text-left hover:bg-gray-50">
        <Coin token={details.token} size="medium" />
        <div className="w-3/4 pt-1">
          <div className="flex justify-between">
            <span className="block text-base font-medium leading-normal">
              <Currency
                value={details.balance}
                token={details.token}
              />
            </span>
          </div>
          <span className="block text-sm text-gray-500 truncate">
            {address || details.title}
          </span>
        </div>
      </div>
    </Link>
  );
}
