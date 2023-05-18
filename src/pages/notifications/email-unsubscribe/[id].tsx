import Button from "@/components/ui/button";
import ArrowButton from "@/components/ui/button/Arrow";
import React, { ReactElement, useState } from "react";
import { useTranslation } from "next-i18next";
import { GetServerSideProps, GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import api from "@/config/api";
import { useRouter } from "next/router";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";

const SUBSCRIPTION_ID = "6GBEtqniAFdHbLMC9bgFliozEvc2";

export default function Unsubscribe() {
  const [loading, setloading] = useState(false);
  const [completed, setcompleted] = useState(false);

  const router = useRouter();

  const confirm = async () => {
    if (loading || completed) return;
    setloading(true);
    try {
      const { data } = await api(router.locale).server.put(`notifications/email/unsubscribe/${SUBSCRIPTION_ID}`);
      setcompleted(true);
      console.log(data);
    } catch (e) {
      console.log(e);
    } finally {
      setloading(false);
    }
  };
  const cancel = () => {
    alert("hello");
  };
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center absolute min-h-screen top-0 w-full">
      <div className={completed ? "hidden" : "relative p-6 text-center"}>
        <h1 className="text-3xl font-medium mb-7">{t("notifications.emails.unsubscribe.confirm.title")}</h1>
        <p
          className="text-lg"
          dangerouslySetInnerHTML={{
            __html: t("notifications.emails.unsubscribe.confirm.text", {
              appName: t("app.name"),
            }),
          }}
        ></p>
        <div className={completed ? "hidden" : "space-x-8 pt-8"}>
          <Button disabled={loading} variant="outline-primary" onClick={confirm}>
            {!loading ? t("notifications.emails.unsubscribe.button.confirm") : t("notifications.emails.unsubscribe.button.loading")}
          </Button>
          {!loading && (
            <Button link="/" target="_self">
              {t("notifications.emails.unsubscribe.button.cancel")}
            </Button>
          )}
        </div>
        <p className="italic pt-6 opacity-80">{t("notifications.emails.unsubscribe.warning")}</p>
      </div>
      <div className={completed ? "relative p-6 text-center" : "hidden"}>
        <h1 className="text-3xl font-medium mb-7">{t("notifications.emails.unsubscribe.success.title")}</h1>
        <p
          className="text-lg"
          dangerouslySetInnerHTML={{
            __html: t("notifications.emails.unsubscribe.confirm.title", {
              appName: t("app.name"),
            }),
          }}
        ></p>

        <div className="space-x-5 pt-8">
          <ArrowButton link="/" target="_self">
            {t("notifications.emails.unsubscribe.button.home")}
          </ArrowButton>
        </div>
      </div>
    </div>
  );
}
Unsubscribe.getLayout = function (page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>;
};
export const getServerSideProps: GetServerSideProps = async ({ locale }) => i18Translate(locale as string);
