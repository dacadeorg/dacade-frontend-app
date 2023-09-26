import ArrowButton from "@/components/ui/button/Arrow";
import { getMetadataTitle } from "@/utilities/Metadata";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { ReactElement, useMemo } from "react";

/**
 * Error component props
 * @date 4/20/2023 - 2:11:29 PM
 *
 * @interface ErrorPageProps
 * @typedef {ErrorPageProps}
 */
interface ErrorPageProps {
  error: {
    statusCode?: number;
    message?: string;
  };
}
export default function Error({ error }: ErrorPageProps) {
  const { t } = useTranslation();
  const title = useMemo(() => {
    switch (error?.statusCode) {
      case 403:
        return t("error.default.title");
      case 404:
        return t("error.404.title");
      default:
        return t("error.default.title");
    }
  }, [error?.statusCode, t]);

  const message = useMemo(() => {
    switch (error?.statusCode) {
      case 403:
        return error?.message;
      case 404:
        return t("error.404.message");
      default:
        return t("error.default.message");
    }
  }, [error?.message, error?.statusCode, t]);

  const showRefresh = () => {
    return error?.statusCode !== 403 && error?.statusCode !== 404;
  };
  return (
    <>
      <Head>
        <title>{getMetadataTitle(t("error.title"), title)}</title>
      </Head>
      <div className="flex items-center justify-center absolute min-h-screen top-0 w-full">
        <div className="relative p-6 text-center">
          <h1 className="text-3xl font-medium mb-6">{title}</h1>
          <p className={`text-lg ${!showRefresh() ? "mb-6" : "mb-2"}`}>{message}</p>
          {showRefresh() && <p className="text-lg mb-6">{t("error.page.button.refresh")}</p>}
          <div className="text-center">
            <ArrowButton padding={true} link="/" target="_self">
              {t("error.page.button.home")}
            </ArrowButton>
          </div>
        </div>
      </div>
    </>
  );
}

Error.getLayout = function (page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>;
};
