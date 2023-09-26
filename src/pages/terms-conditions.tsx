import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import ReactMarkdown from "react-markdown";
import path from "path";
import fs from "fs";
import DefaultLayout from "@/components/layout/Default";
import { ReactElement } from "react";

/**
 * Terms and Conditions page props
 * @date 4/6/2023 - 7:46:02 PM
 *
 * @interface TermsConditionsProps
 * @typedef {TermsConditionsProps}
 */
interface TermsConditionsProps {
  pageProps: {
    terms: string;
  };
}

/**
 * Terms and Conditions page
 * @date 4/6/2023 - 7:45:52 PM
 *
 * @export
 * @param {TermsConditionsProps} {
  terms,
}
 * @returns {*}
 */
export default function TermsConditions({ pageProps: { terms } }: TermsConditionsProps) {
  return (
    <div className="content-wrapper mt-11 ">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <ReactMarkdown>{terms}</ReactMarkdown>
      </article>
    </div>
  );
}

TermsConditions.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={"default"}>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const markdownFilePath = path.join(process.cwd(), "src/content/legal/terms.md");
  const markdownFileContents = fs.readFileSync(markdownFilePath, "utf8");

  return {
    props: {
      terms: markdownFileContents,
      ...(await serverSideTranslations(locale || "en")),
    },
  };
};
