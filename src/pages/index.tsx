import Head from "next/head";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import Button from "@/components/ui/button";

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
        <Button
          loading={false}
          disabled={false}
          rounded={true}
          type="button"
          variant="submit"
          padding={true}
          margin=""
          customStyle={null}
          link=""
          target="_self"
          communityStyles={false}
          onClick={() => console.log("clicked")}
          className="hover:bg-primary group-hover:text-white leading-relaxed lg:px-7 px-5 font-medium"
          text={"Hello World"}
        >
          Hello world
        </Button>
      </main>
    </>
  );
};
export default Home;
