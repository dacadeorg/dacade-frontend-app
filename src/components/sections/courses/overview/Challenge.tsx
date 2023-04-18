import { useSelector } from "@/hooks/useTypedSelector";
import React from "react";
import { useTranslation } from "next-i18next";
import Section from "../../communities/_partials/Section";

/**
 * Challenge component
 * @date 4/18/2023 - 12:24:15 PM
 *
 * @export
 * @returns {*}
 */
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
