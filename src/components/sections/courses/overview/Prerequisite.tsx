import Hint from "@/components/ui/Hint";
import React from "react";
import Section from "../../communities/_partials/Section";
import ObjectiveList from "@/components/list/Objectives";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";

export default function Prerequisite() {
  const { t } = useTranslation();
  const { course } = useSelector(
    (state) => state.communities.courses.current
  );
  return course.prerequisite ? (
    <Section
      title={t("communities.overview.info.prerequisite.title")}
      subtitle={t("communities.overview.info.prerequisite.subtitle")}
    >
      <div className="mb-5">
        <ObjectiveList objectives={course.prerequisite.items} />
      </div>
      <Hint v-if="course.prerequisite.hint">
        <span
          dangerouslySetInnerHTML={{
            __html: course.prerequisite.hint,
          }}
        />
      </Hint>
    </Section>
  ) : null;
}
