import Hint from "@/components/ui/Hint";
import { useSelector } from "@/hooks/useTypedSelector";
import React from "react";
import Section from "../../communities/_partials/Section";
import { useTranslation } from "react-i18next";

export default function Disclaimer() {
  const course = useSelector((state) => state.courses.current);

  const { t } = useTranslation();

  return course && course.disclaimer ? (
    <Section className="mt-0! pt-0!">
      <Hint>
        <strong>
          {t("communities.overview.info.disclaimer.title")}:
        </strong>
        <span
          dangerouslySetInnerHTML={{ __html: course.disclaimer }}
        />
      </Hint>
    </Section>
  ) : null;
}
