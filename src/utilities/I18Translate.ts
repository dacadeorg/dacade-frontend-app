import { serverSideTranslations } from "next-i18next/serverSideTranslations";

/**
 * Get the locale from the query parameters and return the props for the i18n translation to work on the page component
 * @date 3/22/2023 - 11:32:34 AM
 *
 * @async
 * @param {string} locale
 * @returns {unknown}
 */

const i18Translate = async (locale: string) => {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
};

export default i18Translate;
