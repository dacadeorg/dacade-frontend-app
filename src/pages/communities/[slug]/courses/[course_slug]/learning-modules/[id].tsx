import { useMemo, useEffect, ReactElement } from "react";
import Wrapper from "@/components/sections/courses/Wrapper";
import Head from "next/head";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { Community } from "@/types/community";
import { Course, LearningModule } from "@/types/course";
import { setCurrentCourse } from "@/store/feature/course.slice";
import { findLearningModule, setCurrentLearningModule } from "@/store/feature/learningModules.slice";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import DefaultLayout from "@/components/layout/Default";
import Header from "@/components/sections/learning-modules/Header";
import { initCourseNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { setColors } from "@/store/feature/ui.slice";
import useNavigation from "@/hooks/useNavigation";
import { GetServerSideProps } from "next";
import { store } from "@/store";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { fetchCourse } from "@/store/services/course.service";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChallengeOverviewCard from "@/components/cards/challenge/Overview";
import LearningModuleSection from "@/components/sections/learning-modules";

/**
 * Learning module page props interfae
 * @date 4/24/2023 - 8:36:15 PM
 *
 * @interface LearningModulePageProps
 * @typedef {LearningModulePageProps}
 */
interface LearningModulePageProps {
  pageProps: {
    community: Community;
    course: Course;
    learningModule: LearningModule;
  };
}

/**
 * Learning module module view page
 * @date 4/24/2023 - 8:35:52 PM
 *
 * @export
 * @param {LearningModulePageProps} props
 * @returns
 */
export default function LearningModulePage(props: LearningModulePageProps) {
  const { community, course, learningModule } = props.pageProps;
  const dispatch = useDispatch();

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(setCurrentCommunity(community));
    dispatch(setCurrentCourse(course));
    dispatch(setCurrentLearningModule(learningModule));
    dispatch(setColors(community.colors));
    initCourseNavigationMenu(navigation.community)(dispatch);
  }, [community, course, dispatch, learningModule, navigation.community]);

  const title = getMetadataTitle(learningModule?.title!, course?.name!);
  const descriptions = getMetadataDescription(learningModule?.description!);

  return (
    <>
      <Head>
        <title>{title}</title>
        {descriptions.map((meta, i) => (
          <meta key={`learning-module-head-${i}`} {...meta} />
        ))}
      </Head>
      <Wrapper>
        <div className="py-8 flex flex-col divide-y space-y-8 text-gray-700">
          <Header />
          <div className="w-full divide-y divide-solid divide-gray-200">
            {/* TODO: we will have an active challenge here instead picking the first one in the future. */}
            {course.challenges && <ChallengeOverviewCard challenge={course.challenges[0]} />}
            <LearningModuleSection learningModule={learningModule} />
          </div>
        </div>
      </Wrapper>
    </>
  );
}

LearningModulePage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ params, locale }) => {
  try {
    const communitySlug = params?.slug as string;
    const courseSlug = params?.course_slug as string;
    const id = params?.id as string;

    const [{ data: community }, { data: course }, { payload: learningModule }] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug: communitySlug, locale })),
      store.dispatch(fetchCourse({ slug: courseSlug, locale })),
      store.dispatch(findLearningModule(id)),
    ]);

    if (Object.entries(learningModule).length === 0 || Object.entries(course).length === 0 || Object.entries(community).length === 0) {
      return {
        notFound: true,
      };
    } else {
      return {
        props: {
          community,
          course,
          learningModule,
          ...(await serverSideTranslations(locale as string)),
        },
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
