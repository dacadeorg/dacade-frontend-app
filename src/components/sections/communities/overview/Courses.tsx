import { useSelector } from "@/hooks/useTypedSelector";
// TODO: Will be uncommented once the SectionWrapper is merged
// import SectionWrapper from "./_partials/SectionWrapper";
import CourseCard from "@/components/cards/course";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";
import { useGetCourseQuery } from "@/store/feature/course.slice";
import { Course } from "@/types/course";
import { useRouter } from "next/router";
export function CoursesOverview() {
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
