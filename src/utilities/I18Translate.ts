import { SSRConfig } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

/**
 * Get the locales from the query parameters and return the props for the i18n translation
 * @date 3/22/2023 - 11:32:34 AM
 *
 * @async
 * @param {string} locale
 * @returns {i18Translate}
 */

/**
 * Interface for i18Translate return type
 * @date 3/28/2023 - 9:33:46 PM
 *
 * @interface i18Translate
 * @typedef {i18Translate}
 */
interface Ii18Translate {
  props: SSRConfig
}

const i18Translate = async (
  locale: string
): Promise<Ii18Translate> => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default i18Translate;
