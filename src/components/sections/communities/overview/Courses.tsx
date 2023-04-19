import { useSelector } from "@/hooks/useTypedSelector";

import CourseCard from "@/components/cards/course";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";

// Waiting for store/services to be implemented
// import { useGetCourseQuery } from "@/store/feature/course.slice";
import { Course } from "@/types/course";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { SectionWrapper } from "./_partials/SectionWrapper";

/**
 * Course overview component
 * @date 4/14/2023 - 10:58:10 AM
 *
 * @export
 * @returns {ReactElement}
 */
export function CoursesOverview(): ReactElement {
  const {
    ui: { colors },
    communities: { current },
  } = useSelector((state) => state);
  const router = useRouter();
  const { slug } = router.query;
  // Waiting for store/services to be implemented
  // const { data: courseList, error } = useGetCourseQuery(slug);
  const { t } = useTranslation();

  return (
    <>
      <SectionWrapper
        title={`${t("communities.overview.courses.title")}`}
        description={`${t(
          "communities.overview.courses.description"
        )}`}
      >
        {/* 
        // Waiting for store/services to be implemented
        {!error &&
        courseList?.map((course: Course) => (
          <CourseCard
            key={course.id}
            course={course}
            community={current as Community}
          />
        ))} */}
      </SectionWrapper>
    </>
  );
}
