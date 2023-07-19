import { useRouter } from "next/router";
import { ReactElement, useCallback, useEffect, useState } from "react";
import Header from "@/components/sections/communities/_partials/Header";
import SubmissionList from "@/components/sections/submissions/List";
import Wrapper from "@/components/sections/courses/Wrapper";
import SubmissionPopup from "@/components/popups/submission";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { fetchAllSubmission, showSubmission } from "@/store/feature/communities/challenges/submissions";
import DefaultLayout from "@/components/layout/Default";
import MetaData from "@/components/ui/MetaData";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { fetchCourse } from "@/store/services/course.service";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { wrapper } from "@/store";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { setCurrentCourse } from "@/store/feature/course.slice";
import { setSubmissionsList } from "@/store/feature/communities/challenges/submissions";
import { Community } from "@/types/community";
import { Challenge, Course } from "@/types/course";
import { Submission as SubmissionType } from "@/types/bounty";
import { initNavigationMenu } from "@/store/feature/communities/navigation.slice";
import useNavigation from "@/hooks/useNavigation";
import { setColors, toggleBodyScrolling } from "@/store/feature/ui.slice";
import { fetchChallenge, setCurrentChallenge } from "@/store/feature/communities/challenges";

/**
 * Submission page
 * @date 6/6/2023 - 11:43:31 PM
 *
 * @export
 * @param {{ pageProps: { currentCommunity: Community; course: Course; submissions: SubmissionType[] } }} props
 * @returns
 */
export default function Submission(props: { pageProps: { currentCommunity: Community; course: Course; submissions: SubmissionType[]; challenge: Challenge } }) {
  const { currentCommunity, course, submissions, challenge } = props.pageProps;
  const [selectedSubmission, setSelectedSubmission] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { submission_id } = router.query;
  const { t } = useTranslation();
  const navigation = useNavigation();

  const handleCloseSubmission = useCallback(() => {
    setSelectedSubmission("");
    dispatch(showSubmission(""));
    router.replace(router.asPath.split("?")[0], undefined, { shallow: true });
  }, [dispatch, router]);

  useEffect(() => {
    dispatch(setCurrentCommunity(currentCommunity));
    dispatch(setCurrentCourse(course));
    dispatch(setSubmissionsList(submissions));
    dispatch(setColors(currentCommunity.colors));
    dispatch(setCurrentChallenge(challenge));
    initNavigationMenu(navigation.community)(dispatch);
    // Eslint desabled here for avoiding infinite rendering
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course, currentCommunity, dispatch, submissions]);

  useEffect(() => {
    setSelectedSubmission(submission_id as string);
    dispatch(showSubmission(submission_id as string));
    toggleBodyScrolling(!!submission_id)(dispatch);
  }, [dispatch, router.query, submission_id]);

  if (!submissions) return <></>;
  return (
    <>
      <Head>
        <title>{`${t("communities.submission.title")} ${course?.name}`}</title>
        <MetaData description={challenge?.description as string} />
      </Head>
      <Wrapper>
        <div className="flex flex-col py-4 space-y-8 text-gray-700">
          <Header title={course?.name} subtitle={t("communities.submission.title")} />
          <SubmissionList />
        </div>
        <SubmissionPopup show={!!selectedSubmission} submissionId={selectedSubmission} onClose={handleCloseSubmission} />
      </Wrapper>
    </>
  );
}

Submission.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async ({ locale, query }) => {
  const { slug, course_slug, challenge_id } = query;
  const { dispatch } = store;

  const [{ data: currentCommunity }, { data: course }, { payload: submissions }, { payload: challenge }] = await Promise.all([
    dispatch(fetchCurrentCommunity({ slug: slug as string, locale: locale as string })),
    dispatch(fetchCourse({ slug: course_slug as string, locale: locale as string })),
    dispatch(fetchAllSubmission({ challengeId: challenge_id as string, locale: locale as string })),
    dispatch(fetchChallenge({ locale, id: challenge_id as string })),
  ]);

  return {
    props: {
      currentCommunity,
      course,
      submissions,
      challenge,
      ...(await serverSideTranslations(locale as string)),
    },
  };
});
