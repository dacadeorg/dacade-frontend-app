import Section from "@/components/sections/communities/_partials/Section";
import Header from "@/components/sections/communities/_partials/Header";
import ObjectiveList from "@/components/list/Objectives";
import Hint from "@/components/ui/Hint";
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
  const { challenge } = useSelector((state) => ({
    course: state.courses.current,
    challenge: state.challenges.current,
    community: state.communities.current,
  }));

  console.log(challenge);
  return (
    <div>
      <Header isTeamChallenge={challenge?.isTeamChallenge} title={challenge?.name} subtitle={t("communities.challenge.title")} />
      <Section subtitle={`${challenge?.name} based on our learning modules`}>
        <ObjectiveList objectives={challenge?.learningModules.map((module) => module.title)} />
      </Section>
      <Hint>
        <span className="pr-1 font-medium">{t("communities.challenge.hint")}:</span>
        <span
          dangerouslySetInnerHTML={{
            __html: challenge?.hint as string,
          }}
        />
      </Hint>
    </div>
  );
}
