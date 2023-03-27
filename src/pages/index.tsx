import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import DiscordButton from "@/components/ui/DiscordButton";

export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);

const Home = () => {
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
      <main className="flex items-center justify-center h-screen text-6xl font-bold text-white bg-blue-500">
        <span>{t("page.index.main.title")}</span>
        <DiscordButton />
      </main>
    </>
  );
};
export default Home;
