import { ReactElement } from "react";
import Coin from "@/components/ui/Coin";
import { useTranslation } from "next-i18next";
import { Reward } from "@/types/course";

export interface OverviewRewardsProps {
  reward: Reward;
  size: string;
}

/**
 * Rewards card component
 * @date 4/18/2023 - 1:23:16 PM
 *
 * @export
 * @param {OverviewRewardsProps} {
  reward,
  size,
}
 * @returns {ReactElement}
 */
export default function Rewards({ reward, size }: OverviewRewardsProps): ReactElement {
  const { t } = useTranslation();

  return (
    <div>
      {reward && size === "medium" && (
        <div className="flex items-center rounded-full max-w-max">
          <Coin token={reward.token} size={size} />
          <div className="text-base lg:pl-2 lg:pr-3 md:px-2 max-w-max">
            <div className="flex">
              <span className="block font-medium text-md pr-1">{reward.amount}</span>
              <span className="block font-medium text-md">{reward.token}</span>
            </div>
            <div className="flex">
              <div className="text-gray-500 text-base font-normal pr-1">{t("reward.type.prefix")}</div>
              <div className="text-gray-500 text-base font-normal">{t("communities.challenge.submission")}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
