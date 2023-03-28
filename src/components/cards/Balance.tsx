import { ReactElement } from "react";
import Link from "next/link";
import Coin from "@/components/ui/Coin";
import Currency from "@/components/ui/Currency";
import { truncateAddress } from "@/utilities/Address";

interface BalanceProps {
  details: {
    token: string;
    title: string;
    address: string;
    balance: number;
  };
}

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
