import { useSelector } from "@/hooks/useTypedSelector";
// TODO: Will be uncommented once the SectionWrapper is merged
// import SectionWrapper from "./_partials/SectionWrapper";
import CourseCard from "@/components/cards/course";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";
import { Course } from "@/types/course";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useGetCourseQuery } from "@/store/services/course.service";


/**
 * Course overview component
 * @date 4/14/2023 - 10:58:10 AM
 *
 * @export
 * @returns {ReactElement}
 */
export function CoursesOverview():ReactElement {
  const {
    ui: { colors },
    communities: { current },
  } = useSelector((state) => state);
  const router = useRouter();
  const { slug } = router.query;
  const { data: courseList, error } = useGetCourseQuery(slug);
  const { t } = useTranslation();

  return (
    <>
      {/* TODO: Will be uncommented once the SectionWrapper is merged
      <SectionWrapper
        title={`${t("communities.overview.courses.title")}`}
        description={`${t('communities.overview.courses.description')}`}
      > 
    */}
      {!error &&
        courseList?.map((course: Course) => (
          <CourseCard
            key={course.id}
            course={course}
            community={current as Community}
          />
        ))}
      {/* </SectionWrapper> */}
    </>
  );
}
