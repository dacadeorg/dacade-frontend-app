import { useRouter } from "next/router";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { languages } from "@/constants/languages";

/**
 * Locale interface
 * @date 4/20/2023 - 3:43:26 PM
 *
 * @interface Locale
 * @typedef {Locale}
 */
interface Locale {
  id: number;
  code: string;
  name: string;
}

/**
 * Course view language selector
 * @date 4/20/2023 - 3:38:21 PM
 *
 * @returns {ReactElement}
 */
export default function LanguageSelector(): ReactElement {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const course = useSelector((state) => state.courses.current);
  const selected = useMemo(() => i18n.language, [i18n.language]);
  const [locales, setLocales] = useState<Locale[]>([]);
  const show =
    process.env.NEXT_PUBLIC_SHOW_LANGUAGE_SELECTOR === "true";

  /**
   * Setup the available course languages
   *
   * @returns {() => setLocale([])} - clean up the locale state
   */
  useEffect(() => {
    if (course?.translations) {
      course.translations
        .filter((locale) => locale)
        .forEach((translation) => {
          setLocales((prev) => [
            ...prev,
            {
              id: translation.id,
              code: translation.locale,
              name: languages[translation.locale],
            },
          ]);
        });
    }

    return () => {
      setLocales([]);
    };
  }, [course?.translations]);

  /**
   * Change the language of the page
   * @date 4/20/2023 - 3:41:59 PM
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  const handleLocaleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const locale = event.target.value;
    if (locale !== selected) {
      router.push(router.asPath, router.asPath, { locale: locale });
    }
  };

  if (locales.length > 1 && show)
    return (
      <div className="message-rectangle flex flex-col divide-y divide-solid divide-yellow-100">
        <div className="pb-4">
          {t("communities.navigation.language.text")}
        </div>
        <div>
          <select
            value={course?.locale}
            onChange={handleLocaleChange}
            className="translation outline-none focus:outline-none"
          >
            {locales.map((locale) => (
              <option
                selected={i18n.language === locale.code}
                key={locale.id}
                value={locale.code}
              >
                {locale.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  return <></>;
}
