import { wrapper } from "@/store";
import { ReactElement, useEffect, useLayoutEffect } from "react";
import OverviewSection from "@/components/sections/courses/overview";
import {
  fetchCurrentCommunity,
  setCurrentCommunity,
} from "@/store/feature/community.slice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import {
  setCurrentCourse,
  fetchCourse,
  setCourseNavigation,
} from "@/store/feature/course.slice";
import { Community } from "@/types/community";
import { Course } from "@/types/course";
import { setColors } from "@/store/feature/ui.slice";
import Wrapper from "@/components/sections/courses/Wrapper";
import Head from "next/head";
import {
  getMetadataDescription,
  getMetadataTitle,
} from "@/utilities/Metadata";
import DefaultLayout from "@/components/layout/Default";
import { initNavigationMenu } from "@/store/feature/communities/navigation.slice";
import useNavigation from "@/hooks/useNavigation";

export default function CourseViewPage(props: {
  pageProps: {
    community: Community;
    course: Course;
  };
}) {
  const { community, course } = props.pageProps;

  const dispatch = useDispatch();

  const navigation = useNavigation();

  console.log(course);

  const list = navigation.community.init({ community, course });

  useLayoutEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setCurrentCourse(course));
    dispatch(setColors(community.colors));
    dispatch(setCourseNavigation({ list }));
    initNavigationMenu(navigation.community)(dispatch);
  }, [community, course, dispatch, list]);

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
  return (
    <DefaultLayout footerBackgroundColor={"default"}>
      {page}
    </DefaultLayout>
  );
};

export async function getStaticProps({ res, params, locale }: any) {
  const { slug, course_slug } = params;

  const headers = {
    "Accept-Language": "en",
  };

  const [community, course] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities/${slug}`,
      { headers }
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${course_slug}`,
      { headers }
    ),
  ]).then((responses) =>
    Promise.all(responses.map(async (res) => await res.json()))
  );

  if (
    course.status === 404 ||
    community.status === 404 ||
    Object.entries(course).length === 0 ||
    Object.entries(community).length === 0
  ) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        community,
        course,
        ...(await serverSideTranslations(locale as string)),
      },
      revalidate: 60,
    };
  }
}

export async function getStaticPaths() {
  const communities = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities`
  ).then((res) => res.json());

  const getPathes = async () => {
    const paths: any = await Promise.all(
      communities.map(async (e: any) => {
        const courses = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/communities/${e.slug}/courses`
        ).then((res) => res.json());

        const coursePaths: any = [];
        courses.forEach(({ slug }: any) => {
          ["bg", "en", "es", "hr"].forEach((locale) => {
            coursePaths.push({
              params: {
                slug: e.slug,
                course_slug: slug,
              },
              locale: locale,
            });
          });
        });
        return coursePaths;
      })
    );
    return paths.flat();
  };

  const paths = await getPathes();

  return {
    paths,
    fallback: "blocking",
  };
}
