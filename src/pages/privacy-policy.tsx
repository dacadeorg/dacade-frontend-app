import React from "react";
import ReactMarkdown from "react-markdown";

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
export default function PrivacyPolicy({
  pageProps: { privacy },
}: PrivacyPolicyProps) {
  return (
    <div className="content-wrapper">
      <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl">
        <ReactMarkdown>{privacy}</ReactMarkdown>
      </article>
    </div>
  );
}

// create a getstaticprops function to fetch the data from the markdown file
export async function getStaticProps() {
  const res = await fetch(
    "http://localhost:3000/content/legal/privacy.md"
  );
  const privacy = await res.text();

  return {
    props: {
      privacy,
    },
  };
}
