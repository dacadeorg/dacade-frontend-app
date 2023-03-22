import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import Radio from "@/components/Radio";
import { useState } from "react";

export const getStaticProps: GetStaticProps = async ({ locale }) =>
  i18Translate(locale as string);

const Home = () => {
  const { t } = useTranslation();

  const [checked, setChecked] = useState(false);
  return (
    <>
      <Head>
        <title>Dacade</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Peer to peer learning" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="h-fit bg-blue-500 text-white font-bold text-6xl flex justify-center items-center">
        <span>{t("nav.signup.already-exist")}</span>
      </main>
      <Radio onChange={(e) => setChecked(e.target.checked)} checked={checked} />
      <p>{checked ? "yes" : "no"}</p>
    </>
  );
};

export default Home;
