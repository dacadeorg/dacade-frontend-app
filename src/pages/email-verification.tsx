import ArrowButton from "@/components/ui/button/Arrow";
import i18Translate from "@/utilities/I18Translate";
import { GetStaticProps } from "next";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// TODO: user data will be uncommented when the redux store is ready
import { useSelector } from "react-redux";

/**
 * Email verification page
 * @date 4/6/2023 - 7:11:31 PM
 *
 * @export
 * @returns {*}
 */
export default function EmailVerification() {
  const { t } = useTranslation();

  // TODO: user data will be uncommented when the redux store is ready
  //   const { user } = useSelector((state: any) => state?.auth);

  // this will be removed when the redux store is ready
  const user = { email: "johndoe@gmail.com" };

  const resendEmail = async () => {
    //TODO: will be uncommented when the redux store is ready
    // setloading(true);
    // try {
    //   const data = await dispatch("auth/resendEmailVerification");
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   setloading(false);
    // }
  };

  const [loading, setloading] = useState(false);

  return user ? (
    <div className="flex items-center justify-center absolute min-h-screen top-0 w-full">
      <div className="relative p-6 text-center">
        <div>
          <h1 className="text-3xl font-medium mb-7">
            {t("email-verification.title")}
          </h1>
          <p className="text-lg">
            {t("email-verification.subtitle")}
          </p>
          <p className="text-base font-bold mb-4">{user.email}</p>
          <p
            className="text-lg py-4"
            dangerouslySetInnerHTML={{
              __html: t("email-verification.message"),
            }}
          />
          <p className="text-sm py-4">
            {t("email-verification.foot-note")}
          </p>
        </div>

        <div className="text-center mt-1">
          <ArrowButton loading={loading} onClick={resendEmail}>
            {t("email-verification.buttons.resend")}
          </ArrowButton>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);
