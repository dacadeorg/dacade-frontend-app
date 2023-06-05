import { useRouter } from "next/router";
import { ReactElement, useCallback, useEffect, useState } from "react";
import Header from "@/components/sections/communities/_partials/Header";
import List from "@/components/sections/submissions/List";
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
import { setColors } from "@/store/feature/ui.slice";
import { store } from "@/store";
import { setCurrentCommunity } from "@/store/feature/community.slice";
import { setCurrentCourse } from "@/store/feature/course.slice";
import { setList } from "@/store/feature/communities/challenges/submissions/feedback.slice";
import { Community } from "@/types/community";
import { Course } from "@/types/course";
import { Submission as SubmissionType } from "@/types/bounty";

interface SubmissionPageProps {
  currentCommunity: Community;
  course: Course;
  submissions: SubmissionType[];
}
export default function Submission({ currentCommunity, course, submissions }: SubmissionPageProps) {
  const [selectedSubmission, setSelectedSubmission] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { submission_id } = router.query;
  const { challenge } = useSelector((state) => ({ challenge: state.challenges.current }));
  const { t } = useTranslation();

  const handleDisplaySubmission = useCallback(() => {
    setSelectedSubmission(submission_id as string);
    dispatch(showSubmission(selectedSubmission));
    window.history.pushState({}, "", router.pathname);
  }, [dispatch, router.pathname, selectedSubmission, submission_id]);

  const handleCloseSubmission = useCallback(() => {
    setSelectedSubmission("");
    dispatch(showSubmission(""));
    window.history.pushState({}, "", router.pathname);
  }, [dispatch, router.pathname]);

  useEffect(() => {
    dispatch(setCurrentCommunity(currentCommunity));
    dispatch(setCurrentCourse(course));
    dispatch(setList(submissions));
  }, [dispatch, currentCommunity, course, submissions]);

  useEffect(() => {
    if (submission_id) {
      setSelectedSubmission(submission_id as string);
      return;
    }

    return () => handleDisplaySubmission();
  }, [handleDisplaySubmission, submission_id, submissions]);

  return (
    <>
      <Head>
        <title>{`${t("communities.submission.title")} ${course?.name}`}</title>
        <MetaData description={challenge?.description as string} />
      </Head>
      <Wrapper>
        <div className="flex flex-col py-4 space-y-8 text-gray-700">
          <Header title={course?.name} subtitle={t("communities.submission.title")} />
          <List />
        </div>
        <SubmissionPopup show={!!selectedSubmission} submissionId={selectedSubmission} onClose={handleCloseSubmission} />
      </Wrapper>
    </>
  );
}

Submission.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const { slug, course_slug, challenge_id } = query;
  const { dispatch } = store;

  const [{ data: currentCommunity }, { data: course }, { payload: submissions }] = await Promise.all([
    dispatch(fetchCurrentCommunity({ slug: slug as string, locale: locale as string })),
    dispatch(fetchCourse({ slug: course_slug as string, locale: locale as string })),
    dispatch(fetchAllSubmission({ challengeId: challenge_id as string, locale: locale as string })),
  ]);

  // console.log({ currentCommunity, course, submissions });

  return {
    props: {
      currentCommunity,
      course,
      submissions,
      ...(await serverSideTranslations(locale as string)),
    },
  };
};
