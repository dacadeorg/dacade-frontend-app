import { useEffect, ReactElement, useMemo } from "react";
import Wrapper from "@/components/sections/courses/Wrapper";
import Head from "next/head";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { Community } from "@/types/community";
import { Challenge, Course, LearningModule } from "@/types/course";
import { findLearningModule } from "@/store/services/learningModules.service";
import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import DefaultLayout from "@/components/layout/Default";
import Header from "@/components/sections/learning-modules/Header";
import { initCourseNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { IRootState, wrapper } from "@/store";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { fetchCourse } from "@/store/services/course.service";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ChallengeOverviewCard from "@/components/cards/challenge/Overview";
import LearningModuleSection from "@/components/sections/learning-modules";
import useNavigation from "@/hooks/useNavigation";
import ChallengeCard from "@/components/cards/challenge/Challenge";
import { useTranslation } from "next-i18next";
import PageNavigation from "@/components/sections/courses/PageNavigation";
import { NotFoundError } from "@/utilities/errors/NotFoundError";
import { useRouter } from "next/router";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import Section from "@/components/ui/Section";
import Loader from "@/components/ui/Loader";

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
    challenges: Challenge[];
  };
}

interface LearningModuleMultiselector {
  learningModule: LearningModule,
  loading: boolean
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
  const { course, community } = props.pageProps;
  const { learningModule, loading } = useMultiSelector<unknown, LearningModuleMultiselector>({
    learningModule: (state: IRootState) => state.learningModules.current,
    loading: (state: IRootState) => state.learningModules.loading
  })
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const router = useRouter()
  const { query, locale } = router

  useEffect(() => {
    dispatch(initCourseNavigationMenu(navigation.community));
    dispatch(findLearningModule({ id: query?.id as string, locale }))
  }, [dispatch, locale]);

  const title = useMemo(() => getMetadataTitle(learningModule?.title, course.name!), [course.name, learningModule]);
  const descriptions = useMemo(() => getMetadataDescription(learningModule?.description), [learningModule]);
  const paths = useMemo(() => [learningModule?.title], [learningModule?.title]);
  const isLastLearningModule = useMemo(() => {
    if (!learningModule) return false
    if (!course.learningModules || !course.learningModules.length) return false;
    return learningModule.id === course.learningModules[course.learningModules.length - 1].id;
  }, [learningModule, course.learningModules]);

  if (loading)
    return (
      <Section className="h-[50vh] flex items-center justify-center">
        <Loader />
      </Section>
    );
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

    const [{ data: community }, { data: course }, translations] = await Promise.all([
      store.dispatch(fetchCurrentCommunity({ slug: communitySlug, locale })),
      store.dispatch(fetchCourse({ slug: courseSlug, locale })),
      serverSideTranslations(locale as string),
    ]);
    if (!community || !course) throw new NotFoundError();
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
