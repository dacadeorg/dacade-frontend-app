import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import HomeLayout from "@/layouts/Home";
import { ReactElement, useEffect } from "react";
import { wrapper } from "@/store";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Community } from "@/types/community";
import CommunitiesSection from "@/components/sections/homepage/Communities";
import MainSection from "@/components/sections/homepage/Main";
import TestimonialsSection from "@/components/sections/homepage/Testimonials";
import { fetchAllCommunities } from "@/store/services/community.service";
import RequireAuth from "@/layouts/RequireAuth";

const Home = (props: { pageProps: { communities: Community[] } }) => {
  const { t } = useTranslation();
  const {
    pageProps: { communities },
  } = props;

  return (
    <>
      <main>
        <MainSection />
        <CommunitiesSection communities={communities} />
        <TestimonialsSection />
      </main>
    </>
  );
};

Home.getLayout = function (page: ReactElement) {
  return <HomeLayout>{page}</HomeLayout>;
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps((store: any) => async ({ locale }: any) => {
  await i18Translate(locale as string);
  const result = await store.dispatch(fetchAllCommunities(locale));

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
});
export default Home;
