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
import api from "@/config/api";

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

export async function getStaticProps({ params, locale }: any) {
  const { slug, course_slug } = params;

  const [community, course] = await Promise.all([
    api(locale).server.get<Community>(`/communities/${slug}`),
    api(locale).server.get<Community>(`/courses/${course_slug}`),
  ]).then((res) => res.map(({ data }) => data));

  return {
    props: {
      community,
      course,
      ...(await serverSideTranslations(locale as string)),
    },
    revalidate: 60,
  };
}

interface Path {
  params: {
    slug: string;
    course_slug: string;
  };
  locale: string;
}

export async function getStaticPaths() {
  const { data: communities } = await api().server.get<Community[]>(
    `/communities`
  );

  const getPathes = async () => {
    const paths = await Promise.all(
      communities.map(async (e) => {
        const { data: courses } = await api().server.get<Course[]>(
          `/courses`
        );
        const coursePaths: Path[] = [];

        courses.forEach(({ slug }) => {
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

  const paths: Path[] = await getPathes();

  return {
    paths,
    fallback: "blocking",
  };
}
