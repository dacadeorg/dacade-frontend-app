import { useMemo } from "react";
import Loader from "@/components/ui/Loader";
import ArrowButton from "@/components/ui/button/Arrow";
import { getMetadataTitle } from "@/utilities/Metadata";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { verifyEmailUpdate } from "@/store/feature/auth.slice";
import { ReactElement } from "react-markdown/lib/react-markdown";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

/**
 * Email verification update page
 * @date 4/27/2023 - 8:19:02 PM
 *
 * @param {{ verified: boolean }} props
 * @returns
 */
export default function EmailVerification(props: {
  verified: boolean;
}): ReactElement {
  const { verified } = props;
  const router = useRouter();
  const { t } = useTranslation();

  const title = useMemo(
    () =>
      getMetadataTitle(
        verified
          ? t("email-verification.success.title")
          : t("email-verification.processing")
      ),
    [t, verified]
  );

  const goHome = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center absolute min-h-screen top-0 w-full">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="relative p-6 text-center">
        {!verified ? (
          <>
            <Loader />
            <p className="mt-5">
              {t("email-verification.processing")}
            </p>
          </>
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-medium mb-7">
                {t("email-verification.success.title")}
              </h1>
              <p className="text-lg">
                {t("email-verification.success.subtitle")}
              </p>
              <p className="text-lg">
                {t("email-verification.success.message")}
              </p>
            </div>

            <div className="text-center pt-8">
              <ArrowButton onClick={goHome}>
                {t("email-verification.success.button")}
              </ArrowButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

EmailVerification.getLayout = function (page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>;
};

export const getServerSideProps = async (data: {
  locale: string;
  query: any;
}) => {
  const { query } = data;

  if (!query?.code) {
    return {
      redirect: "/403",
    };
  }

  try {
    await verifyEmailUpdate(query?.code as string);

    return {
      props: {
        ...(await serverSideTranslations(data.locale as string)),
        verified: false,
      },
    };
  } catch (err) {
    return {
      notFound: true,
    };
  }
};
