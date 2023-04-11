import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetServerSideProps, GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import { wrapper } from "@/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { communitiesApi } from "@/store/feature/communities.slice";
import { Community } from "@/types/community";
import CommunitiesSection from "@/components/sections/homepage/Communities";
import { ReactElement, useEffect, useLayoutEffect } from "react";
import HomeLayout from "@/layouts/Home";
import MainSection from "@/components/sections/homepage/Main";

const Home = (props: { pageProps: { communities: Community[] } }) => {
  const { t } = useTranslation();
  const { communities } = props.pageProps;

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
      <main
        className="flex items-center justify-center h-screen- 
       font-bold text-white bg-blue-500-"
      >
        <CommunitiesSection communities={communities} />
      </main>
    </>
  );
};

Home.getLayout = function (page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store: any) =>
    async ({ locale }: any) => {
      // const i18 = await i18Translate(locale as string);
      const result = await store.dispatch(
        communitiesApi.endpoints.getCommunities.initiate()
      );
      if (result.status !== "fulfilled")
        return {
          props: {
            ...(await serverSideTranslations(locale as string)),
            communities: [],
          },
        };
      const communities = result.data;
      return {
        props: {
          ...(await serverSideTranslations(locale as string)),
          communities,
        },
      };
    }
);
export default Home;
