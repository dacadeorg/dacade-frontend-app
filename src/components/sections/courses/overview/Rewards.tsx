import Section from "../../communities/_partials/Section";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import Reward from "@/components/ui/Reward";
import { ReactElement } from "react";
import { Reward as RewardType } from "@/types/course";

/**
 * Rewards component
 * @date 4/18/2023 - 12:25:06 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Rewards(): ReactElement {
  const { t } = useTranslation();

  const course = useSelector((state) => state.courses.current);
  return (
    <>
      {course && course.challenge ? (
        <Section
          title={t("communities.overview.reward.title")}
          subtitle={t("communities.overview.reward.subtitle")}
        >
          <div className="grid grid-cols-2 pt-4 lg:grid-cols-3">
            {course.challenge.rewards.map(
              (reward: RewardType, i: number) => {
                return (
                  <Reward
                    key={`reward-${i}`}
                    reward={reward}
                    size="medium"
                    category={reward.type.toLowerCase()}
                  />
                );
              }
            )}
          </div>
        </Section>
      ) : (
        <></>
      )}
    </>
  );
}
