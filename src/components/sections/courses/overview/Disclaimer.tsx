import Hint from "@/components/ui/Hint";
import { useSelector } from "@/hooks/useTypedSelector";
import Section from "../../communities/_partials/Section";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Disclaimer component
 * @date 4/18/2023 - 12:24:31 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Disclaimer(): ReactElement {
  const course = useSelector((state) => state.courses.current);

  const { t } = useTranslation();

  if (course && !course.disclaimer) return <></>;
  return (
    <Section className="!pb-12 !pt-0">
      <Hint>
        <strong>{t("communities.overview.info.disclaimer.title")}: </strong>
        <span dangerouslySetInnerHTML={{ __html: course?.disclaimer as string }} />
      </Hint>
    </Section>
  );
}
