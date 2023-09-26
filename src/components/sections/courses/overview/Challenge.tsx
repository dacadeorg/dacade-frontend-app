import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import Section from "../../communities/_partials/Section";
import { ReactElement } from "react";

/**
 * Challenge component
 * @date 4/18/2023 - 12:24:15 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Challenge(): ReactElement {
  const course = useSelector((state) => state.courses.current);

  const { t } = useTranslation();
  return course && course.challenge ? (
    <Section title={t("communities.overview.challenge")}>
      <span className="block mt-3 text-base font-normal md:text-lg">{course.challenge.description}</span>
    </Section>
  ) : (
    <></>
  );
}
