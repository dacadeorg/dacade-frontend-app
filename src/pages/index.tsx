import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetServerSideProps, GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import HomeLayout from "@/layouts/Home";
import { ReactElement } from "react";
import { wrapper } from "@/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { communitiesApi } from "@/store/feature/communities.slice";
import { Community } from "@/types/community";
import CommunitiesSection from "@/components/sections/homepage/Communities";
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
      <main className="flex items-center justify-center h-screen text-6xl font-bold">
        <MainSection />
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
      await i18Translate(locale as string);
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
