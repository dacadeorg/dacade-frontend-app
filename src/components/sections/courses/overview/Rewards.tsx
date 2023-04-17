import React from "react";
import Section from "../../communities/_partials/Section";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import Reward from "@/components/ui/Reward";

export default function Rewards() {
  const { t } = useTranslation();

  const course = useSelector((state) => state.courses.current);
  return course && course.challenge ? (
    <Section
      title={t("communities.overview.reward.title")}
      subtitle={t("communities.overview.reward.subtitle")}
    >
      <div className="grid grid-cols-2 lg:grid-cols-3 pt-4">
        {course.challenge.rewards.map((reward: any, i: any) => {
          return (
            <div key={i}>
              <Reward
                reward={reward}
                category={reward.type.toLowerCase()}
              />
            </div>
          );
        })}
      </div>
    </Section>
  ) : null;
}
