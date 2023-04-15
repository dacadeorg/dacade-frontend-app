import CourseCard from "@/components/cards/course";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";
import { useGetCourseQuery } from "@/store/feature/course.slice";
import { Course } from "@/types/course";
import { ReactElement } from "react";
import { SectionWrapper } from "./_partials/SectionWrapper";

/**
 * Course overview component
 * @date 4/14/2023 - 10:58:10 AM
 *
 * @export
 * @returns {ReactElement}
 */
export function CoursesOverview({
  community,
}: {
  community: Community;
}): ReactElement {
  const { data: courseList, error } = useGetCourseQuery(
    community.slug
  );
  const { t } = useTranslation();

  return (
    <SectionWrapper
      title={`${t("communities.overview.courses.title")}`}
      description={`${t("communities.overview.courses.description")}`}
    >
      {!error &&
        courseList?.map((course: Course) => (
          <CourseCard
            key={course.id}
            course={course}
            community={community}
          />
        ))}
    </SectionWrapper>
  );
}
