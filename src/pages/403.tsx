
import { ReactElement } from "react";
import Error from "@/layouts/Error";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";

/**
 * Forbiden error page
 * @date 4/20/2023 - 3:44:14 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Page403(): ReactElement {
  return <Error error={{ statusCode: 404 }} />;
}

export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);
