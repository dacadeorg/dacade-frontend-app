import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const i18Translate = async (locale: string): Promise<SSRConfig> => await serverSideTranslations(locale);

export default i18Translate;
