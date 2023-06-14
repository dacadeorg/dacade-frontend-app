import Coin from "@/components/ui/Coin";
import { Reward } from "@/types/course";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

interface OverviewRewardsProps {
  reward: Reward;
  size: string;
}

/**
 * Component for the OverviewRewards
 * @date 3/30/2023 - 2:59:58 PM
 *
 * @export
 * @param {OverviewRewardsProps} {
  reward,
  size,
}
 * @returns {ReactElement}
 */
export default function OverviewRewards({ reward, size }: OverviewRewardsProps): ReactElement {
  const { t } = useTranslation();

  return (
    <div>
      {reward && size === "medium" && (
        <div className="flex items-center rounded-full max-w-max">
          <Coin token={reward.token} size={size} />
          <div className="text-base lg:pl-2 lg:pr-3 md:px-2 max-w-max">
            <div className="flex">
              <span className="block pr-1 font-medium text-md">{reward.amount}</span>
              <span className="block font-medium text-md">{reward.token}</span>
            </div>
            <div className="flex text-base font-normal text-gray-500">
              <div className="pr-1">{t("reward.type.prefix")}</div>
              <div className="">{t("communities.challenge.submission")}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
