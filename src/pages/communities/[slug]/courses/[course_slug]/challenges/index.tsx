import { ReactElement } from "react-markdown/lib/react-markdown";
import DefaultLayout from "@/components/layout/Default";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { Redirecting } from "@/layouts/Redirecting";

/**
 * For redirecting all the links that contains the `/courses/[course_slug]/`
 * @date 9/27/2023 - 11:10:55 AM
 *
 * @export
 * @returns
 */
export default function OldChallengesPage() {
  const router = useRouter();
  return <Redirecting router={router.query} finalPage="challenges" />;
}

OldChallengesPage.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});
