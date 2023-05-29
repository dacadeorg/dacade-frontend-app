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

export default function Submission() {
  const [selectedSubmission, setSelectedSubmission] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const { submission_id, slug, course_slug, challenge_id } = router.query;
  const { course, submissions, challenge } = useSelector((state) => ({
    course: state.courses.current,
    submissions: state.submissions.current,
    challenge: state.challenges.current,
  }));
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
    if (slug && course_slug && challenge_id) {
      dispatch(
        fetchCurrentCommunity({
          slug: slug as string,
          locale: router.locale as string,
        })
      );
      dispatch(
        fetchCourse({
          slug: course_slug as string,
          locale: router.locale as string,
        })
      );
      dispatch(
        fetchAllSubmission({
          challengeId: challenge_id as string,
          locale: router.locale as string,
        })
      ).catch((e: any) => {
        console.error(e);
      });
    }
  }, [slug, course_slug, challenge_id, dispatch, router.locale]);

  useEffect(() => {
    if (!!submissions) {
      setSelectedSubmission(submissions.id);
      return;
    }
  }, [submissions]);

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
  return <DefaultLayout footerBackgroundColor="default">{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});
