import LayoutWithoutFooter from "@/layouts/WithoutFooter";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";
import { ReactElement } from "react";
import Error from "@/layouts/Error";
import i18Translate from "@/utilities/I18Translate";

/**
 * Error page props
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
export default function ErrorPage({ error }: ErrorPageProps): ReactElement {
  return <Error error={error} />;
}
export const getServerSideProps: GetServerSideProps = async ({ locale, res }) => {
  return {
    props: {
      ...(await i18Translate(locale as string)),
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
