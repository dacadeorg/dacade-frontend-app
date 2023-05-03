import { ReactElement } from "react";
import Error from "@/layouts/Error";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import LayoutWithoutFooter from "@/layouts/WithoutFooter";

/**
 * Not found page
 * @date 4/20/2023 - 3:44:14 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Page404(): ReactElement {
  return (
    <Error error={{ statusCode: 404, message: "Page not found" }} />
  );
}

Page404.getLayout = function (page: ReactElement) {
  return <LayoutWithoutFooter>{page}</LayoutWithoutFooter>;
};
export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);
