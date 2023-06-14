import { GetStaticProps } from "next";

import ReactMarkdown from "react-markdown";
import path from "path";
import fs from "fs";
import { ReactElement } from "react";
import DefaultLayout from "@/components/layout/Default";
import i18Translate from "@/utilities/I18Translate";

/**
 * Privacy and policy page props
 * @date 4/6/2023 - 7:46:02 PM
 *
 * @interface PrivacyPolicyProps
 * @typedef {PrivacyPolicyProps}
 */
interface PrivacyPolicyProps {
  pageProps: {
    privacy: string;
  };
}

/**
 * Privacy and policy page
 * @date 4/6/2023 - 7:45:52 PM
 *
 * @export
 * @param {PrivacyPolicyProps} {
  privacy,
}
 * @returns {*}
 */
export default function PrivacyPolicy({ pageProps: { privacy } }: PrivacyPolicyProps) {
  return (
    <div className="content-wrapper">
      <article className="prose prose-sm mt-11 sm:prose lg:prose-lg xl:prose-xl">
        <ReactMarkdown>{privacy}</ReactMarkdown>
      </article>
    </div>
  );
}

PrivacyPolicy.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={"default"}>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const markdownFilePath = path.join(process.cwd(), "src/content/legal/privacy.md");
  const markdownFileContents = fs.readFileSync(markdownFilePath, "utf8");

  return {
    props: {
      privacy: markdownFileContents,
      ...(await i18Translate(locale || "en")),
    },
  };
};
