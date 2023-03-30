import { ReactElement } from "react";
import Coin from "@/components/ui/Coin";
import classNames from "classnames";

interface RewardBadgeProps {
  reward?: {
    token?: string;
    amount?: number;
  };
  type?: string;
}

export default function RewardBadge({
  reward = {},
  type = "transparent",
}: RewardBadgeProps): ReactElement {
  const { token, amount } = reward;

  const rewardClassname = classNames(
    "font-semibold leading-none text-center inline-flex items-center justify-between rounded-full text-xs p-0.5 h-5 space-x-2",
    {
      "bg-white bg-opacity-25 text-white": type === "transparent",
      "bg-gray-200 text-gray-500": type !== "transparent",
    }
  );

  return (
    <span className={rewardClassname}>
      {token && <Coin token={token} size="small" />}
      {amount && (
        <div className="pl-0 pr-2 font-medium">
          {amount}
          {token}
        </div>
      )}
    </span>
  );
}
