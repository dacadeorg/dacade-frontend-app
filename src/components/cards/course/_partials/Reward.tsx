import RewardBadge from "@/components/badges/RewardBadge";
import { ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { Reward } from "@/types/course";

interface OverviewRewardsProps {
  reward: Reward;
}

/**
 * OverviewRewards course component
 * @date 3/30/2023 - 12:48:18 PM
 *
 * @export
 * @param {OverviewRewardsProps} {
  reward,
}
 * @returns {ReactElement}
 */

export default function OverviewRewards({ reward }: OverviewRewardsProps): ReactElement {
  const { t } = useTranslation();

  return (
    <div className="text-base text-left flex sm:flex-start flex-row justify-between sm:flex-col sm:space-y-4">
      <div className="text-xxs tracking-wider px-1 font-semibold uppercase text-gray-500">{t("course.challenge.reward")}</div>
      <div>
        <div className="font-normal text-5xl text-gray-900">
          {reward.stable && "$"}
          {reward.amount}
        </div>
        {reward && (
          <div className="text-right sm:text-left mt-3">
            <RewardBadge reward={reward} type="gray" />
          </div>
        )}
      </div>
    </div>
  );
}
