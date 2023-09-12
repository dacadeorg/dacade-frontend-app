import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";
import CourseCard from "@/components/cards/course";
import { Course } from "@/types/course";
import { ReactElement } from "react";
import { SectionWrapper } from "./_partials/SectionWrapper";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { IRootState } from "@/store";

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
  // const { courseList, community } = useSelector((state) => ({
  //   courseList: state.courses.list,
  //   community: state.communities.current,
  // }));
  const { courseList, community } = useMultiSelector<unknown, CoursesOverviewMultiSelector>({
    courseList: (state: IRootState) => state.courses.list,
    community: (state: IRootState) => state.communities.current,
  });
  const { t } = useTranslation();

  return (
    <SectionWrapper title={`${t("communities.overview.courses.title")}`} description={`${t("communities.overview.courses.description")}`}>
      {courseList?.map((course: Course) => (
        <CourseCard key={course.id} course={course} community={community as Community} />
      ))}
    </SectionWrapper>
  );
}
