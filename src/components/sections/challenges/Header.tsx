import Section from "@/components/sections/communities/_partials/Section";
import Header from "@/components/sections/communities/_partials/Header";
import ObjectiveList from "@/components/list/Objectives";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Challenge header component
 * @date 4/18/2023 - 12:08:02 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function ChallengeHeader(): ReactElement {
  const { t } = useTranslation();
  const { course, challenge } = useSelector((state) => ({
    course: state.courses.current,
    challenge: state.challenges.current,
  }));

  return (
    <div>
      <Header isTeamChallenge={challenge?.isTeamChallenge} title={challenge?.name} subtitle={t("communities.challenge.title")} description={challenge?.description} />
      <Section>
        <ObjectiveList objectives={challenge?.objectives} />
      </Section>
    </div>
  );
}
