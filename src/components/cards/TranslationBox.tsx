import { useState, useEffect, useCallback, ReactElement, useMemo } from "react";
import { Translate } from "@/utilities/Translate";
import Markdown from "@/components/ui/Markdown";
import { useRouter } from "next/router";
import LOCALES from "@/constants/locales";
import { languages } from "@/constants/languages";
import { useTranslation } from "react-i18next";
type DefaultLocale = "en" | "fr";
/**
 * TranslationBox card component props
 * @date 3/29/2023 - 3:01:53 PM
 *
 * @interface TranslationBoxProps
 * @typedef {TranslationBoxProps}
 */

interface TranslationBoxProps {
  text: string;
  defaultLocale: DefaultLocale;
  disabled?: boolean;
  textContainerCssClasses?: string;
  textCssClasses?: string;
}
interface Locale {
  [key: string]: { code: string; name: string };
}

/**
 * Constructuct accepted locales with their languages
 * @date 10/11/2023 - 4:51:12 PM
 *
 * @returns {Locale}
 */
const acceptedLocales = () => {
  const newLocales: Locale = {};
  Object.keys(languages).forEach((language) => {
    if (LOCALES.includes(language)) {
      newLocales[language] = {
        code: language,
        name: languages[language],
      };
    }
  });
  return newLocales;
};

const locales = acceptedLocales();

/**
 * TranslationBox card component
 * @date 3/29/2023 - 2:53:35 PM
 *
 * @export
 * @param {TranslationBoxProps} {
  text,
  defaultLocale,
  disabled,
  textContainerCssClasses,
  textCssClasses,
}
 * @returns {ReactElement}
 */

export default function TranslationBox({ text, defaultLocale, disabled, textContainerCssClasses, textCssClasses }: TranslationBoxProps): ReactElement {
  const [currentText, setCurrentText] = useState(text);
  const [locale, setLocale] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string | null>("");
  const [reverted, setReverted] =useState(false) 

  const { t } = useTranslation();
  const router = useRouter();

  const getDefaultLocale = useCallback(() => {
    return defaultLocale || "en";
  }, [defaultLocale]);

  const translated = useMemo(() => locale && locale !== getDefaultLocale(), [getDefaultLocale, locale]);
  const currentLocale = router.locale || "en";
  /**
   * Translate using google translate
   * @date 3/29/2023 - 2:54:49 PM
   *
   * @type {() => Promise<void>}
   */

  const translate = useCallback(async () => {
    if (translated) return;
    setLoading(true);

    try {
      const translatedText = await Translate({
        currentLocale: getDefaultLocale(),
        newLocale: currentLocale,
        text,
      });

      setCurrentText(translatedText);
      setLocale(currentLocale);
    } catch (e) {
      console.log("There was an error with the translation requests: ", e);
    }

    setLoading(false);
    setReverted(false)
  }, [getDefaultLocale, text]);

  /**
   * Reset the language translation to default
   * @date 3/29/2023 - 2:59:06 PM
   */

  const revert = () => {
    setCurrentText(text);
    setReverted(true);
    setLocale(defaultLocale);
  };

  const getLocaleName = (code: "en" | "fr" | string) => {
    return locales[code]?.name;
  };

  useEffect(() => {
    setDescription(translated ? t("ui.translated") : t("ui.translate"));
   if(!translated && !reverted){
    translate()
   }
  }, [translated]);

  const translatable = currentLocale !== defaultLocale && !disabled && getLocaleName(defaultLocale);
  return (
    <div className="relative w-full pb-5">
      {currentText ? (
        <div className={`-my-5 ${textContainerCssClasses}`}>
          <Markdown value={currentText} markDownStyles={`${textCssClasses} translation-box`} />
        </div>
      ) : (
        <></>
      )}

      {translatable && (
        <div className="pt-5 text-gray-400">
          {loading ? (
            <span>Translating...</span>
          ) : (
            <div className="flex divide-x divide-gray-200">
              <div className={`pr-3 ${!translated ? "cursor-pointer underline" : ""}`} onClick={translate}>
                <span>
                  {description} {getLocaleName(currentLocale)}
                </span>
              </div>
              {translated && (
                <div className="pl-3 underline cursor-pointer" onClick={revert}>
                  <span>
                    {t("ui.translation.action.original")} {getLocaleName(defaultLocale)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
