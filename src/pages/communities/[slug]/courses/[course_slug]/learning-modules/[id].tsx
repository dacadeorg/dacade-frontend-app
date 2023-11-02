import { useEffect, ReactElement, useMemo } from "react";
import Wrapper from "@/components/sections/courses/Wrapper";
import Head from "next/head";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { Community } from "@/types/community";
import { Challenge, Course, LearningModule } from "@/types/course";
import { findLearningModule } from "@/store/feature/learningModules.slice";
import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import DefaultLayout from "@/components/layout/Default";
import Header from "@/components/sections/learning-modules/Header";
import { initCourseNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { wrapper } from "@/store";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { fetchCourse } from "@/store/services/course.service";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChallengeOverviewCard from "@/components/cards/challenge/Overview";
import LearningModuleSection from "@/components/sections/learning-modules";
import useNavigation from "@/hooks/useNavigation";
import ChallengeCard from "@/components/cards/challenge/Challenge";
import { useTranslation } from "react-i18next";
import PageNavigation from "@/components/sections/courses/PageNavigation";

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
    challenges: Challenge[];
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
export default function LearningModulePage(props: LearningModulePageProps): ReactElement {
  const { course, learningModule, community } = props.pageProps;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(initCourseNavigationMenu(navigation.community));
  }, [dispatch]);

  const title = getMetadataTitle(learningModule.title!, course.name!);
  const descriptions = getMetadataDescription(learningModule.description!);
  const paths = useMemo(() => [learningModule?.title], [learningModule?.title]);
  const isLastLearningModule = useMemo(() => {
    if (!course.learningModules || !course.learningModules.length) return false;
    return learningModule.id === course.learningModules[course.learningModules.length - 1].id;
  }, [learningModule.id, course.learningModules]);

  return (
    <>
      <Head>
        <title>{title}</title>
        {descriptions.map((meta, i) => (
          <meta key={`learning-module-head-${i}`} {...meta} />
        ))}
      </Head>
      <Wrapper paths={paths}>
        <div className="py-8 flex flex-col space-y-8 text-gray-700">
          <Header />
          <div className="w-full">
            {course.challenges && course.challenges.map((challenge) => <ChallengeOverviewCard challenge={challenge} key={challenge.id} community={community} />)}
            <LearningModuleSection learningModule={learningModule} />
            {isLastLearningModule ? (
              course.challenges && (
                <div>
                  <div className="mt-6 mb-5">
                    <h2 className="font-medium text-.5xl text-gray-700 pb-3">{t("communities.challenge.title")}</h2>
                    <p className="text-lg">{t("communities.overview.learning-modules-challenge-introduction")}</p>
                  </div>
                  {course.challenges.map((challenge) => (
                    <ChallengeCard data={challenge} key={challenge.id} community={community} isCourseEnd />
                  ))}
                </div>
              )
            ) : (
              <PageNavigation />
            )}
          </div>
        </div>
      </Wrapper>
    </>
  );
}

LearningModulePage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params, locale }) => {
  try {
    const communitySlug = params?.slug as string;
    const courseSlug = params?.course_slug as string;
    const id = params?.id as string;

    const [{ data: community }, { data: course }, { payload: learningModule }, translations] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug: communitySlug, locale })),
      store.dispatch(fetchCourse({ slug: courseSlug, locale })),
      store.dispatch(findLearningModule(id)),
      serverSideTranslations(locale as string),
    ]);
    if (!community) throw new Error("Community not found");
    if (!course) throw new Error("Course not found");
    if (!learningModule) throw new Error("Learning module not found");
    return {
      props: {
        community,
        course,
        learningModule,
        ...translations,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
});
