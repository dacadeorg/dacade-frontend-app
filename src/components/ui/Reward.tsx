import Coin from "../ui/Coin";
import { useTranslation } from "next-i18next";
import { Reward } from "@/types/course";
import { shortenNumber } from "@/utilities";

interface OverviewRewardsProps {
  reward: Reward;
  category?: string;
  size?: string;
}

export default function OverviewRewards({ reward, category, size }: OverviewRewardsProps) {
  const { t } = useTranslation();

  return (
    <div data-testid="reward">
      {reward && reward.token && reward.amount && size === "medium" && (
        <div className="flex items-center rounded-full max-w-max mr-4">
          <Coin token={reward.token} className="flex-none" />
          <div className="text-base lg:pl-2 lg:pr-3 md:px-2 max-w-max">
            <div className="flex">
              <span className="block font-medium text-base pr-1">{shortenNumber(reward.amount)}</span>
              <span className="block font-medium text-base">{reward.token}</span>
            </div>
            <div className="flex">
              <div className="text-gray-500 text-sm font-normal pr-1">{t("reward.type.prefix")}</div>
              <div className="text-gray-500 text-sm font-normal">{t(`communities.challenge.${category}`)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
