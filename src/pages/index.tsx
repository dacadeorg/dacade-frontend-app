import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import Avatar from "@/components/ui/Avatar";
import user from "@/public/assets/img/yannick.png";

export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);

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
      <main className="h-screen bg-blue-500- text-white font-bold text-6xl flex justify-center items-center">
        <span>{t("nav.signup.already-exist")}</span>
        <Avatar
          color="blue"
          useLink={false}
          user={{
            displayName: "Mbuke prince",
            username: "mbukeprince",
            avatar: "https://vercel.com/api/www/avatar?u=mbukerepo&s=64",
          }}
          icon={"https://vercel.com/api/www/avatar?u=mbukerepo&s=64"}
        />
      </main>
    </>
  );
};

export default Home;
