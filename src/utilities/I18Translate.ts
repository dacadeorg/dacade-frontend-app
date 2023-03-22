import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const i18Translate = async (locale: string) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default i18Translate;
