import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import MainSection from "@/components/sections/homepage/Main";
import HomeLayout from "@/layouts/Home";
import { ReactElement } from "react";



export default function Home() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>Dacade</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1"
        />
        <meta
          name="description"
          content={`${t("page.index.main.title")}`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* TODO: The max with should be removed when the home page layout is migrated */}
      <main className="relative max-w-7xl mx-auto">
        <MainSection />
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);

Home.getLayout = function (page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};
