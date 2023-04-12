import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import React from "react";
import ReactMarkdown from "react-markdown";
import path from "path";
import fs from "fs";

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
export default function TermsConditions({
  pageProps: { terms },
}: TermsConditionsProps) {
  return (
    <div className="content-wrapper">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <ReactMarkdown>{terms}</ReactMarkdown>
      </article>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const markdownFilePath = path.join(
    process.cwd(),
    "src/content/legal/terms.md"
  );
  const markdownFileContents = fs.readFileSync(
    markdownFilePath,
    "utf8"
  );

  return {
    props: {
      terms: markdownFileContents,
      ...(await serverSideTranslations(locale || "en")),
    },
  };
};
