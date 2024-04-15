import Coin from "@/components/ui/Coin";
import { shortenNumber } from "@/utilities";
import classNames from "classnames";
import { ReactElement } from "react";

/**
 * Reward interface
 * @date 3/27/2023 - 6:10:17 PM
 *
 * @typedef {Object} Reward
 * @property {string} token - The token of the reward.
 * @property {number} amount - The amount of the reward.
 */
interface Reward {
  token?: string;
  amount?: number;
}

/**
 * This is an interface for RewardBadge component props
 *
 * @date 3/27/2023 - 6:08:46 PM
 * @typedef {Object} RewardBadgeProps
 * @property {Reward} [reward] - The reward object.
 * @property {'transparent' | 'gray' | 'light-gray'} [type] - The type of the badge.
 * @interface RewardBadgeProps
 * @typedef {RewardBadgeProps}
 */

interface RewardBadgeProps {
  type?: "transparent" | "gray" | "light-gray";
  reward?: Reward;
  displayAmount?: boolean;
}

export default function RewardBadge({ reward = {}, type = "transparent", displayAmount = true }: RewardBadgeProps): ReactElement {
  const { token, amount } = reward;

  const badgeClassnames = classNames("font-semibold leading-none text-center inline-flex items-center justify-between rounded-full text-xs p-0.5 h-5 space-x-2-", {
    "bg-white bg-opacity-25 text-white": type === "transparent",
    "bg-gray-200 text-gray-500": type === "gray",
    "bg-gray-100 text-gray-500": type === "light-gray",
  });
  if (!reward) return <></>;
  return (
    <span className={badgeClassnames}>
      {token && <Coin token={token} size="small" />}
      {amount && (
        <div className="font-medium pl-0 pr-2">
          {displayAmount && shortenNumber(amount)} {token}
        </div>
      )}
    </span>
  );
}
