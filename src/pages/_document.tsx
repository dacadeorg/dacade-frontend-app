import { useTranslation } from "next-i18next";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const { t } = useTranslation();
  return (
    <Html lang="en">
      <Head>
        <meta property="og:title" content="Dacade" key="title" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={`${t("page.index.main.title")}`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
