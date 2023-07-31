import ObjectiveList from "@/components/list/Objectives";
import Section from "@/components/sections/communities/_partials/Section";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Challenge objectives component
 * @date 7/28/2023 - 5:04:54 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Objectives(): ReactElement {
  const { t } = useTranslation();
  const challenge = useSelector((state) => state.challenges.current);
  return (
    <Section title={`${t("communities.overview.challenge.objective.title")}`}>
      <ObjectiveList objectives={challenge?.objectives} />
    </Section>
  );
}
