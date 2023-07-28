import ObjectiveList from "@/components/list/Objectives";
import Section from "@/components/sections/communities/_partials/Section";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "react-i18next";

export default function ChallengeObjectives() {
  const { t } = useTranslation();
  const challenge = useSelector((state) => state.challenges.current);
  return (
    <Section title={t("communities.overview.challenge.objective.title") as string}>
      <ObjectiveList objectives={challenge?.objectives} />
    </Section>
  );
}
