import { useSelector } from "@/hooks/useTypedSelector";
// import SectionWrapper from "./_partials/SectionWrapper";
import CourseCard from "@/components/cards/course";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";
import { useGetCourseQuery } from "@/store/feature/course.slice";
import { useEffect } from "react";

export function CoursesOverview() {
  const {
    ui: { colors },
    communities: { current },
  } = useSelector((state) => state);

  const { data: courseList , error , isLoading } = useGetCourseQuery("algorand")
  useEffect(() => {
    console.log(courseList);
  }, [courseList])

  const { t } = useTranslation();
  return (
    <>
      {/* <SectionWrapper
      title={`${t("communities.overview.courses.title")}`}
      description="$t('communities.overview.courses.description')"
    > */}
      {!error &&  courseList?.map((course) => (
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
