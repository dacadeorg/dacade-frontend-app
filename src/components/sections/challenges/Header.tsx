import Section from "@/components/sections/communities/_partials/Section";
import Header from "@/components/sections/communities/_partials/Header";
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
  const challenge = useSelector((state) => state.challenges.current);

  return (
    <div data-testid="challengeHeaderId">
      <Header isTeamChallenge={challenge?.isTeamChallenge} title={challenge?.name} subtitle={t("communities.challenge.title")} isHackathon={challenge?.isHackathon} />
      <Section subtitle={challenge?.description} />
    </div>
  );
}
