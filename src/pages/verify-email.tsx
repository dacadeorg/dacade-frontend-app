import { useState, useEffect, ReactElement, useCallback } from "react";
import { useTranslation } from "next-i18next";
import Loader from "@/components/ui/Loader";
import ArrowButton from "@/components/ui/button/Arrow";
import { getMetadataTitle } from "@/utilities/Metadata";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";
import { GetServerSideProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import Head from "next/head";
import { useRouter } from "next/router";
import { verifyEmail } from "@/store/services/auth.service";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Email verification page
 * @date 4/27/2023 - 12:20:36 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function EmailVerification(): ReactElement {
  const { t } = useTranslation();
  const [verified, setVerified] = useState(false);
  const isVerificationInProgress = useSelector((state) => state.auth.isVerificationInProgress);

  const router = useRouter();
  const { locale } = useRouter();
  const dispatch = useDispatch();
  const code = router.query.code as string;

  const verify = useCallback(async () => {
    if (!code) return;
    try {
      await dispatch(verifyEmail({ locale: locale as string, payload: { code } }));
      console.log("the verification is on the way", isVerificationInProgress);
      setVerified(true);
    } catch (error) {
      console.error(error);
    }
  }, [code, dispatch, locale]);

  useEffect(() => {
    if (code) verify();
  }, [code, verify]);

  const goHome = () => {
    router.push("/login");
  };

  return (
    <div className="absolute top-0 flex items-center justify-center w-full min-h-screen">
      <Head>
        <title>{getMetadataTitle(verified ? t("email-verification.success.title") : t("email-verification.processing"))}</title>
      </Head>
      <div className="relative p-6 text-center">
        {!verified ? (
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

            <div className="pt-8 text-center">
              <ArrowButton onClick={() => goHome()}>{t("email-verification.success.button")}</ArrowButton>
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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({ props: { ...(await i18Translate(locale as string)) } });
