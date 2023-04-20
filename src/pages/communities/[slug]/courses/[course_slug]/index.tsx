import { wrapper } from "@/store";
import HomeLayout from "@/layouts/Home";
import { ReactElement, useEffect } from "react";
import OverviewSection from "@/components/sections/courses/overview";
import {
  fetchCurrentCommunity,
  setCurrent as setCurrentCommunity,
} from "@/store/feature/community.slice";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useDispatch } from "react-redux";
import {
  setCurrent,
  fetchCourse,
  setNavigation,
} from "@/store/feature/course.slice";
import { Community } from "@/types/community";
import { Course } from "@/types/course";
import { setColors } from "@/store/feature/ui.slice";
import Wrapper from "@/components/sections/courses/Wrapper";
import CommunityNavigation from "@/utilities/CommunityNavigation";
import { useRouter } from "next/router";
import Head from "next/head";
import {
  getMetadataDescription,
  getMetadataTitle,
} from "@/utilities/Metadata";
import CommunityLayout from "@/layouts/Community";
import DefaultLayout from "@/components/layout/Default";

export default function CourseViewPage(props: {
  pageProps: {
    community: Community;
    course: Course;
    courses: Course[];
  };
}) {
  const { community, course } = props.pageProps;

  const dispatch = useDispatch();

  const router = useRouter();

  const communityNavigation = new CommunityNavigation(router);

  const list = communityNavigation.init({ community, course });

  useEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setCurrent(course));
    dispatch(setColors(community.colors));
    dispatch(setNavigation({ list }));
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (data) => {
    const { query } = data;
    const slug = query?.slug as string;
    const course_slug = query?.course_slug as string;

    const fetchArgs = {
      locale: data.locale as string,
    };

    const getCurrentCommunty = store.dispatch(
      fetchCurrentCommunity({ ...fetchArgs, slug })
    );
    const getCurrentCourse = store.dispatch(
      fetchCourse({ ...fetchArgs, slug: course_slug })
    );

    const results = await Promise.all([
      getCurrentCommunty,
      getCurrentCourse,
    ]);

    const community = results[0].payload;
    const course = results[1].payload;

    if (course) {
      return {
        props: {
          ...(await serverSideTranslations(data.locale as string)),
          community,
          course,
        },
      };
    } else {
      return {
        notFound: true,
      };
    }
  }
);
