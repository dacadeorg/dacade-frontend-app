import { useEffect, useState } from "react";
import SubmissionView from "@/components/sections/submissions/View";
import Section from "@/components/ui/Section";
import Header from "@/components/sections/communities/_partials/Header";
import { useRouter } from "next/router";
import { findWithRelations } from "@/store/feature/communities/challenges/submissions";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react-markdown/lib/react-markdown";
import DefaultLayout from "@/components/layout/Default";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { getMetadataTitle } from "@/utilities/Metadata";
import Head from "next/head";
import Loader from "@/components/ui/Loader";
import useSafePush from "@/hooks/useSafePush";
import { Course } from "@/types/course";
import { Submission } from "@/types/bounty";
import { IRootState } from "@/store";

/**
 * interface for Submission/[submission_id] page multiSelector
 * @date 9/13/2023 - 11:57:16 AM
 *
 * @interface SubmissionMultiSelector
 * @typedef {SubmissionMultiSelector}
 */
interface SubmissionMultiSelector {
  course: Course | null;
  submission: Submission | null;
}
/**
 * Submssion view page
 * @date 6/19/2023 - 11:50:38 PM
 *
 * @export
 * @returns
 */
export default function Submission() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { course, submission } = useMultiSelector<unknown, SubmissionMultiSelector>({
    course: (state: IRootState) => state.courses.current,
    submission: (state: IRootState) => state.submissions.current,
  });
  const { safePush } = useSafePush();

  const { submission_id } = router.query;
  useEffect(() => {
    setLoading(true);
    const fetchCourseSubmssion = async () => {
      try {
        await dispatch(findWithRelations({ id: submission_id as string, locale: router.locale }));
        setLoading(false);
      } catch (error) {
        router.back();
      }
    };
    fetchCourseSubmssion();
  }, [submission_id, router.locale]);

  useEffect(() => {
    const redirectUrl = `/communities/${submission?.community.slug}/challenges/${submission?.challenge.id}/submissions?submission_id=${submission?.id}`;
    if (submission) safePush(redirectUrl);
  }, [submission]);

  return (
    <>
      <Head>
        <title>{getMetadataTitle(t("communities.submission.title"), `${course?.name}`)}</title>
      </Head>

      <Section>
        <div className="py-4 lg:px-10 xl:px-20 flex flex-col space-y-8 text-gray-700">
          <Header title={course?.name} subtitle={t("communities.submission.title")} />
          {loading ? (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-full w-full -translate-y-1/2 z-999 flex items-center justify-center bg-white">
              <Loader />
            </div>
          ) : (
            <SubmissionView />
          )}
        </div>
      </Section>
    </>
  );
}

Submission.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});
