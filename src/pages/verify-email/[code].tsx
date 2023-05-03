import { useState, useEffect, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import Loader from "@/components/ui/Loader";
import ArrowButton from "@/components/ui/button/Arrow";
import { getMetadataTitle } from "@/utilities/Metadata";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import Head from "next/head";
import { useRouter } from "next/router";
import { verifyEmail } from "@/store/services/auth.service";

/**
 * Email verification page
 * @date 4/27/2023 - 12:20:36 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function EmailVerification(): ReactElement {
  const { t } = useTranslation();
  const [verified, setVerified] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      const code = router.query.code as string;
      if (!code) return;
      try {
        await verifyEmail(code);
        setVerified(true);
      } catch (error) {
        console.error(error);
      }
    };
    verify();
  }, [router.query.code]);

  const goHome = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center absolute min-h-screen top-0 w-full">
      <Head>
        <title>
          {getMetadataTitle(
            verified
              ? t("email-verification.success.title")
              : t("email-verification.processing")
          )}
        </title>
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

EmailVerification.getLayout = function getLayout(page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>;
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);
