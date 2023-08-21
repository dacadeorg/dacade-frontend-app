import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import HomeLayout from "@/layouts/Home";
import { ReactElement } from "react";
import { wrapper } from "@/store";
import { Community } from "@/types/community";
import CommunitiesSection from "@/components/sections/homepage/Communities";
import MainSection from "@/components/sections/homepage/Main";
import TestimonialsSection from "@/components/sections/homepage/Testimonials";
import { fetchAllCommunities } from "@/store/services/community.service";

const Home = (props: { pageProps: { communities: Community[] } }) => {
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
  const result = await store.dispatch(fetchAllCommunities(locale));
  if (result.status !== "fulfilled")
    return {
      props: {
        ...(await i18Translate(locale as string)),
        communities: [],
      },
    };

  const communities = result.data;

  return {
    props: {
      ...(await i18Translate(locale as string)),
      communities,
    },
  };
});
export default Home;
