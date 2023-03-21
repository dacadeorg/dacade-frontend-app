import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale as string)),
    },
  };
};

const Home = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>Dacade</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Peer to peer learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-screen bg-blue-500 text-white font-bold text-6xl flex justify-center items-center">
        <span>{t("nav.signup.already-exist")}</span>
      </main>
    </>
  );
};

export default Home;
