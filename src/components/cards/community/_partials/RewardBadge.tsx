import { ReactElement } from "react";
import Coin from "@/components/ui/Coin";
import classNames from "classnames";

/**
 * Interface for Badge props
 * @date 3/30/2023 - 2:57:29 PM
 *
 * @interface RewardBadgeProps
 * @typedef {RewardBadgeProps}
 */
interface RewardBadgeProps {
  reward?: {
    token?: string;
    amount?: number;
  };
  type?: string;
}

/**
 * Reward card, this is a partial 
 * @date 3/30/2023 - 2:58:50 PM
 *
 * @export
 * @param {RewardBadgeProps} {
  reward = {},
  type = "transparent",
}
 * @returns {ReactElement}
 */
export default function RewardBadge({
  reward = {},
  type = "transparent",
}: RewardBadgeProps): ReactElement {
  const rewardClassname = classNames(
    "font-semibold leading-none text-center inline-flex items-center justify-between rounded-full text-xs p-0.5 h-5 space-x-2",
    {
      "bg-white bg-opacity-25 text-white": type === "transparent",
      "bg-gray-200 text-gray-500": type !== "transparent",
    }
  );

  return (
    <span className={rewardClassname}>
      {reward.token && <Coin token={reward.token} size="small" />}

      <div className="pl-0 pr-2 font-medium">
        {reward.amount}
        {reward.token}
      </div>
    </span>
  );
}
