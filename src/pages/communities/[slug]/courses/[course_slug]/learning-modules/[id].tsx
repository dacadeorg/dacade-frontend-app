import { useEffect, ReactElement } from "react";
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
import { fetchAllChallenges } from "@/store/services/communities/challenges";
import Overview from "@/components/cards/challenge/Overview";
import OverviewSection from "@/components/sections/courses/overview";

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
  const { course, learningModule, community, challenges } = props.pageProps;
  const dispatch = useDispatch();
  console.log(challenges, "challenges")
  const navigation = useNavigation();

  useEffect(() => {
    initCourseNavigationMenu(navigation.community)(dispatch);
  }, [dispatch]);

  const title = getMetadataTitle(learningModule.title!, course.name!);
  const descriptions = getMetadataDescription(learningModule.description!);

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
            {course.challenges && course.challenges.map((challenge) => <ChallengeOverviewCard challenge={challenge} key={challenge.id} community={community} />)}
            <LearningModuleSection learningModule={learningModule} />
            {/* <span className="bg-lime-300 h-3 w-40">{JSON.stringify(challenges)}</span> */}
            <div>
              <div className="mt-6 mb-5 gap-3">
                <h2 className="font-medium text-[1.375rem] text-gray-700">
                  Challenge
                </h2>
                <p className="text-lg">After finishing the learning materials you can take part in this challenge:</p>
              </div>
              {course.challenges && course.challenges.map((challenge) => <ChallengeCard data={challenge} key={challenge.id} community={community} isCourseEnd />)}
            </div>
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
    // const challengeSlug = params?.challenge_slug as string;
    const id = params?.id as string;

    const [{ data: community }, { data: course }, { payload: learningModule }, translations] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug: communitySlug, locale })),
      store.dispatch(fetchCourse({ slug: courseSlug, locale })),
      // store.dispatch(fetchAllChallenges({ slug: communitySlug })),
      store.dispatch(findLearningModule(id)),
      serverSideTranslations(locale as string),
    ]);

    return {
      props: {
        community,
        course,
        // challenges,
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
