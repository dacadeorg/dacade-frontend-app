import Section from "@/components/sections/communities/_partials/Section";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement, useMemo } from "react";
import RewardsList from "./_partials/RewardsList";

/**
 * Overview reward section component
 * @date 4/18/2023 - 1:44:34 PM
 *
 * @export
 * @returns {ReactElement}
 */
export function OverviewRewards(): ReactElement {
  const { t } = useTranslation();
  const challenge = useSelector((state) => state.challenges.current);

  const rewards = useMemo(
    () =>
      challenge?.rewards.filter(
        (reward) => reward.type === "SUBMISSION"
      ),
    [challenge?.rewards]
  );

  const rewardsDescription = rewards?.length
    ? `${rewards?.[0].amount} ${rewards?.[0].token}`
    : "";

  return (
    <Section
      title={t("communities.challenge.rewards.description") as string}
    >
      <div className="pt-8 grid grid-cols-1 md:grid-cols-2">
        <RewardsList rewards={rewards} />
        <div className="md:mt-0 mt-5 flex items-end pb-2">
          <p className="text-sm w-full">
            {t("communities.challenge.rewards.description", {
              maxPoints: challenge?.maxPoints,
              minPoints: challenge?.minPoints,
              reward: rewardsDescription,
            })}
          </p>
        </div>
      </div>
    </Section>
  );
}
