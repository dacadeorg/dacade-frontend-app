import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";
import CourseCard from "@/components/cards/course";
import { Course } from "@/types/course";
import { ReactElement } from "react";
import { SectionWrapper } from "./_partials/SectionWrapper";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { IRootState } from "@/store";

/**
 * interface for CourseOverview multiSelector
 * @date 9/13/2023 - 9:09:09 AM
 *
 * @interface CoursesOverviewMultiSelector
 * @typedef {CoursesOverviewMultiSelector}
 */
interface CoursesOverviewMultiSelector {
  courseList: Course[];
  community: Community | null;
}

/**
 * Course overview component
 * @date 4/14/2023 - 10:58:10 AM
 *
 * @export
 * @returns {ReactElement}
 */
export function CoursesOverview(): ReactElement {
  const { courseList, community } = useMultiSelector<unknown, CoursesOverviewMultiSelector>({
    courseList: (state: IRootState) => state.courses.list,
    community: (state: IRootState) => state.communities.current,
  });
  const { t } = useTranslation();

  return (
    <SectionWrapper title={`${t("communities.overview.courses.title")}`} description={`${t("communities.overview.courses.description")}`}>
      {courseList?.map((course: Course) => (
        <CourseCard
          key={`learning-card-data-${course.id}`}
          title={course.name}
          description={course.description}
          link={`/communities/${community?.slug}/courses/${course.slug}`}
          duration={course.duration}
          level={course.level}
          learningModulesCount={course.learningModules?.length}
        />
      ))}
    </SectionWrapper>
  );
}
