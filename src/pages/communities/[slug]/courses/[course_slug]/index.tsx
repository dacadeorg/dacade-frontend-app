import { ReactElement, useEffect, useMemo } from "react";
import OverviewSection from "@/components/sections/courses/overview";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { setCourseNavigation } from "@/store/feature/course.slice";
import { Community } from "@/types/community";
import { Course } from "@/types/course";
import Wrapper from "@/components/sections/courses/Wrapper";
import Head from "next/head";
import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import DefaultLayout from "@/components/layout/Default";
import { initCourseNavigationMenu } from "@/store/feature/communities/navigation.slice";
import useNavigation from "@/hooks/useNavigation";
import { GetServerSideProps } from "next";
import { wrapper } from "@/store";
import { fetchCourse } from "@/store/services/course.service";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function CourseViewPage(props: {
  pageProps: {
    community: Community;
    course: Course;
  };
}) {
  const { community, course } = props.pageProps;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  const list = navigation.community.init({ community, course });

  useEffect(() => {
    dispatch(setCourseNavigation({ list }));
    dispatch(initCourseNavigationMenu(navigation.community));
  }, [community, course, dispatch, list, navigation.community]);

  const title = getMetadataTitle(course.name);
  const descriptions = getMetadataDescription(course.description);
  const paths = useMemo(() => [course.name], [course]);

  return (
    <Wrapper paths={paths}>
      <Head>
        <title>{title}</title>
        {descriptions.map((meta, i) => (
          <meta key={`sourse_slug-head-${i}`} {...meta} />
        ))}
      </Head>
      <div className="flex flex-col py-8 space-y-8 text-gray-700 divide-y divide-gray-200 lg:py-0 lg:pb-8 divide-solid">
        <OverviewSection />
      </div>
    </Wrapper>
  );
}

CourseViewPage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ params, locale }) => {
  try {
    const slug = params?.slug as string;
    const course_slug = params?.course_slug as string;

    const [{ data: community }, { data: course }, translations] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug, locale })),
      store.dispatch(fetchCourse({ slug: course_slug, locale })),
      serverSideTranslations(locale as string),
    ]);
    if (!community) throw new Error("Community not found");
    if (!course) throw new Error("Course not found");
    return {
      props: {
        community,
        course,
        ...translations,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
});
