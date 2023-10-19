import { useEffect, useState } from "react";
import SubmissionView from "@/components/sections/submissions/View";
import Section from "@/components/ui/Section";
import Header from "@/components/sections/communities/_partials/Header";
import { useRouter } from "next/router";
import { findWithRelations } from "@/store/feature/communities/challenges/submissions";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react-markdown/lib/react-markdown";
import DefaultLayout from "@/components/layout/Default";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useTranslation } from "next-i18next";
import { getMetadataTitle } from "@/utilities/Metadata";
import Head from "next/head";
import Loader from "@/components/ui/Loader";
import useSafePush from "@/hooks/useSafePush";
import { Submission as SubmissionType } from "@/types/bounty";
import { wrapper } from "@/store";
/**
 * Submission view page
 * @date 6/19/2023 - 11:50:38 PM
 *
 * @export
 * @returns
 */
export default function Submission(props: {
  pageProps: {
    submission: SubmissionType;
  };
}) {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading] = useState(true);
  const course = useSelector((state) => state.courses.current);
  const { safePush } = useSafePush();
  const { submission } = props.pageProps;

  useEffect(() => {
    try {
      if (submission?.community.slug && submission?.challenge.id) {
        const redirectUrl = `/communities/${submission?.community.slug}/challenges/${submission?.challenge.id}/submissions/${submission?.id}`;
        safePush(redirectUrl);
      }
    } catch (error) {
      router.back();
    }
  }, [submission, router.locale]);

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

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (data) => {
  const {
    locale,
    query: { submission_id },
  } = data;
  try {
    const [submissions, translations] = await Promise.all([
      store.dispatch(findWithRelations({ id: submission_id as string, locale: locale })),
      serverSideTranslations(locale as string),
    ]);
    return {
      props: {
        submission: submissions.payload,
        ...translations,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
});
