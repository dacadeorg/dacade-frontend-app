import CourseCard from "@/components/cards/course";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";
import { Course } from "@/types/course";
import { ReactElement } from "react";
import { SectionWrapper } from "./_partials/SectionWrapper";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Course overview component
 * @date 4/14/2023 - 10:58:10 AM
 *
 * @export
 * @returns {ReactElement}
 */
export function CoursesOverview(): ReactElement {
  const {
    communities: { current: community },
  } = useSelector((state) => state);
  const courseList = useSelector((state) => state.courses.list);
  const { t } = useTranslation();

  return (
    <SectionWrapper
      title={`${t("communities.overview.courses.title")}`}
      description={`${t("communities.overview.courses.description")}`}
    >
      {courseList?.map((course: Course) => (
        <CourseCard
          key={course.id}
          course={course}
          community={community as Community}
        />
      ))}
    </SectionWrapper>
  );
}
