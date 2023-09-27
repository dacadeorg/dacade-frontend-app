import { useEffect } from "react";
import Section from "@/components/ui/Section";
import { ReactElement } from "react-markdown/lib/react-markdown";
import DefaultLayout from "@/components/layout/Default";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import removeCourseFromLink from "@/utilities/removeCourseFromLink";
import Loader from "@/components/ui/Loader";
import useSafePush from "@/hooks/useSafePush";

/**
 * For redirecting all the links that contains the `/courses/[course_slug]/`
 * @date 9/27/2023 - 11:10:55 AM
 *
 * @export
 * @returns
 */
export default function OldChallengesPage() {
  const router = useRouter();
  const { safePush } = useSafePush();
  useEffect(() => {
    const redirectUrl = removeCourseFromLink(router.query, "challenges");
    safePush(redirectUrl);
  }, []);

  return (
    <>
      <Head>
        <title>Redirecting...</title>
      </Head>

      <Section>
        <Loader />
      </Section>
    </>
  );
}

OldChallengesPage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});
