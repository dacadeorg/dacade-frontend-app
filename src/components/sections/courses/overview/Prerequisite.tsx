import Hint from "@/components/ui/Hint";
import Section from "../../communities/_partials/Section";
import ObjectiveList from "@/components/list/Objectives";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react";

/**
 * Prerequisite component
 * @date 4/18/2023 - 12:24:59 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Prerequisite(): ReactElement {
  const { t } = useTranslation();
  const course = useSelector((state) => state.courses.current);

  if (course && !course.prerequisite) return <></>;
  return (
    <Section data-testid="prerequisiteId" title={t("communities.overview.info.prerequisite.title")} subtitle={t("communities.overview.info.prerequisite.subtitle")}>
      <div className="mb-5">
        <ObjectiveList data-testid="objectivesListShow" objectives={course?.prerequisite.items} />
      </div>
      {course?.prerequisite.hint && (
        <Hint>
          <span
            dangerouslySetInnerHTML={{
              __html: course.prerequisite.hint,
            }}
          />
        </Hint>
      )}
    </Section>
  );
}
