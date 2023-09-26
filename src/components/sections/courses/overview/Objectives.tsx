import ObjectiveList from "@/components/list/Objectives";
import Section from "../../communities/_partials/Section";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react";

/**
 * Objectives component
 * @date 4/18/2023 - 12:24:51 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Objectives(): ReactElement {
  const { t } = useTranslation();

  const course = useSelector((state) => state.courses.current);

  return course ? (
    <Section title={t("communities.overview.objective.title")} subtitle={t("communities.overview.objective.subtitle")}>
      <ObjectiveList objectives={course.objectives} />
    </Section>
  ) : (
    <></>
  );
}
