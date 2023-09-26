import { useMemo, useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import ArrowButton from "@/components/ui/button/Arrow";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react-markdown/lib/react-markdown";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { getMetadataTitle } from "@/utilities/Metadata";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { verifyEmailUpdate } from "@/store/services/auth.service";

/**
 * Email verification update page
 * @date 4/27/2023 - 8:19:02 PM
 *
 * @returns
 */
export default function EmailVerification(): ReactElement {
  const router = useRouter();
  const { t } = useTranslation();
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);
  const title = useMemo(() => getMetadataTitle(isVerified ? t("email-verification.success.title") : t("email-verification.processing")), [t, isVerified]);

  useEffect(() => {
    const verify = async () => {
      const code = router.query.code as string;
      if (!code) {
        return await router.push("/403");
      }

      try {
        await dispatch(verifyEmailUpdate({ locale: locale as string, payload: { code } }));
        setIsVerified(true);
      } catch (error) {
        console.error(error);
      }
    };

    void verify();
  }, [dispatch, locale, router.query.code]);

  const goHome = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center absolute min-h-screen top-0 w-full">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="relative p-6 text-center">
        {!isVerified ? (
          <>
            <Loader />
            <p className="mt-5">{t("email-verification.processing")}</p>
          </>
        ) : (
          <>
            <div>
              <h1 className="text-3xl font-medium mb-7">{t("email-verification.success.title")}</h1>
              <p className="text-lg">{t("email-verification.success.subtitle")}</p>
              <p className="text-lg">{t("email-verification.success.message")}</p>
            </div>

            <div className="text-center pt-8">
              <ArrowButton onClick={goHome}>{t("email-verification.success.button")}</ArrowButton>
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};
