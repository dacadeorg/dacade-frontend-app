import ArrowButton from "@/components/ui/button/Arrow";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";

/**
 * Error page props
 * @date 4/20/2023 - 2:11:29 PM
 *
 * @interface ErrorPageProps
 * @typedef {ErrorPageProps}
 */
interface ErrorPageProps {
  error?: {
    statusCode?: number;
    message?: string;
  };
};

export default function ErrorPage({
  error,
}: ErrorPageProps): ReactElement {
  const { t } = useTranslation();
  const title = () => {
    switch (error?.statusCode) {
      case 403:
        return t("error.default.title");
      case 404:
        return t("error.404.title");
      default:
        return t("error.default.title");
    }
  };

  const message = () => {
    switch (error?.statusCode) {
      case 403:
        return error?.message;
      case 404:
        return t("error.404.message");
      default:
        return t("error.default.message");
    }
  };

  const showRefresh = () => {
    return error?.statusCode !== 403 && error?.statusCode !== 404;
  };

  return (
    <div className="flex items-center justify-center absolute min-h-screen top-0 w-full">
      <div className="relative p-6 text-center">
        <h1 className="text-3xl font-medium mb-6">{title()}</h1>
        <p className={`text-lg ${!showRefresh() ? "mb-6" : "mb-2"}`}>
          {message()}
        </p>
        {showRefresh() && (
          <p className="text-lg mb-6">
            {t("error.page.button.refresh")}
          </p>
        )}
        <div className="text-center">
          <ArrowButton padding={true} link="/" target="_self">
            {t("error.page.button.home")}
          </ArrowButton>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async ({
  locale,
  res,
}) => {
  const translations = await serverSideTranslations(locale as string);

  return {
    props: {
      ...translations,
      error: {
        statusCode: res.statusCode,
        message: res.statusMessage ? res.statusMessage : null,
      },
    },
  };
};

ErrorPage.getLayout = function (page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>;
};
