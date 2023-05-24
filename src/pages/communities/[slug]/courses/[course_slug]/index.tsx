import { ReactElement, useEffect } from "react";
import OverviewSection from "@/components/sections/courses/overview";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { useDispatch } from "react-redux";
import { setCurrentCourse, setCourseNavigation } from "@/store/feature/course.slice";
import { Community } from "@/types/community";
import { Course } from "@/types/course";
import { setColors } from "@/store/feature/ui.slice";
import Wrapper from "@/components/sections/courses/Wrapper";
import Head from "next/head";
import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import DefaultLayout from "@/components/layout/Default";
import { initNavigationMenu } from "@/store/feature/communities/navigation.slice";
import useNavigation from "@/hooks/useNavigation";
import { GetServerSideProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import { store } from "@/store";
import { fetchCourse } from "@/store/services/course.service";
import { fetchCurrentCommunity } from "@/store/services/community.service";

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
    dispatch(setCurrentCommunity(community));
    dispatch(setCurrentCourse(course));
    dispatch(setColors(community.colors));
    dispatch(setCourseNavigation({ list }));
    initNavigationMenu(navigation.community)(dispatch);
  }, [community, course, dispatch, list, navigation.community]);

  const title = getMetadataTitle(course.name);
  const descriptions = getMetadataDescription(course.description);

  return (
    <Wrapper>
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

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const slug = params?.slug as string;
    const course_slug = params?.course_slug as string;

    const [{ data: community }, { data: course }] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug, locale })),
      store.dispatch(fetchCourse({ slug: course_slug, locale })),
    ]);

    return {
      props: {
        community,
        course,
        ...(await i18Translate(locale as string)),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
