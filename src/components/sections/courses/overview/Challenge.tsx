import { useSelector } from "@/hooks/useTypedSelector";
import React from "react";
import { useTranslation } from "next-i18next";
import Section from "../../communities/_partials/Section";

export default function Challenge() {
  const course = useSelector((state) => state.courses.current);

  const { t } = useTranslation();
  return course && course.challenge ? (
    <Section title={t("communities.overview.challenge")}>
      <span className="block text-base md:text-lg font-normal mt-3">
        {course.challenge.description}
      </span>
    </Section>
  ) : null;
}
