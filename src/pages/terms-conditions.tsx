import React from "react";
import ReactMarkdown from "react-markdown";

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

// create a getstaticprops function to fetch the data from the markdown file
export async function getStaticProps() {
  const res = await fetch(
    "http://localhost:3000/content/legal/terms.md"
  );
  const terms = await res.text();

  return {
    props: {
      terms,
    },
  };
}
