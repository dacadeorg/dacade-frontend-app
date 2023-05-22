import ArrowButton from "@/components/ui/button/Arrow";
import { useSelector } from "@/hooks/useTypedSelector";
import i18Translate from "@/utilities/I18Translate";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { resendEmailVerification } from "@/store/services/auth.service";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";

/**
 * Email verification page
 * @date 4/6/2023 - 7:11:31 PM
 *
 * @export
 * @returns {ReactElement}
 */

export default function EmailVerification(): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const user = useSelector((state) => state.auth.data);
  const dispatch = useDispatch();

  const resendEmail = async () => {
    setloading(true);
    try {
      dispatch(resendEmailVerification());
    } catch (e) {
      console.error(e);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center absolute min-h-screen top-0 w-full">
      <div className="relative p-6 text-center">
        <div>
          <h1 className="text-3xl font-medium mb-7">{t("email-verification.title")}</h1>
          <p className="text-lg">{t("email-verification.subtitle")}</p>
          <p className="text-base font-bold mb-4">{user?.email}</p>
          <p
            className="text-lg py-4"
            dangerouslySetInnerHTML={{
              __html: t("email-verification.message"),
            }}
          />
          <p className="text-sm py-4">{t("email-verification.foot-note")}</p>
        </div>

        <div className="text-center mt-1">
          <ArrowButton loading={loading} onClick={resendEmail}>
            {t("email-verification.buttons.resend")}
          </ArrowButton>
        </div>
      </div>
    </div>
  );
}

EmailVerification.getLayout = function (page: ReactNode) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => i18Translate(locale as string);
