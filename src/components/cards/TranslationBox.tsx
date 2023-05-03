import {
  useState,
  useEffect,
  useCallback,
  ReactElement,
  useMemo,
} from "react";
import { Translate } from "@/utilities/Translate";
import Markdown from "@/components/ui/Markdown";
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
  textContainerCssClasses: string | object | Array<any>;
  textCssClasses: string | object | Array<any>;
}

/**
 * Locale languages
 * @date 3/29/2023 - 3:00:38 PM
 *
 * @type {{ en: { code: string; name: string; }; fr: { code: string; name: string; }; }}
 */

const locales = {
  en: {
    code: "en",
    name: "English",
  },
  fr: {
    code: "fr",
    name: "Français",
  },
};

const currentLocale = "en";

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

export default function TranslationBox({
  text,
  defaultLocale,
  disabled,
  textContainerCssClasses,
  textCssClasses,
}: TranslationBoxProps): ReactElement {
  const [currentText, setCurrentText] = useState("");
  const [locale, setLocale] = useState("");
  const [loading, setLoading] = useState(false);

  const getDefaultLocale = useCallback(() => {
    return defaultLocale || "en";
  }, [defaultLocale]);

  const translated = useMemo(
    () => locale !== getDefaultLocale(),
    [getDefaultLocale, locale]
  );

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
      console.log(
        "There was an error with the translation request: ",
        e
      );
    }

    setLoading(false);
  }, [getDefaultLocale, text, translated]);

  useEffect(() => {
    setCurrentText(text);
    translate();
  }, [defaultLocale, text, translate]);

  /**
   * Reset the language translation to default
   * @date 3/29/2023 - 2:59:06 PM
   */

  const revert = () => {
    setCurrentText(text);
    setLocale(defaultLocale);
  };

  const getLocaleName = (code: "en" | "fr") => {
    return locales[code].name;
  };

  const translatable =
    currentLocale !== defaultLocale &&
    !disabled &&
    getLocaleName(defaultLocale);

  return (
    <div className="w-full relative">
      {currentText && (
        <div className={`-my-5 ${textContainerCssClasses}`}>
          <Markdown
            className={textCssClasses as string}
            value={currentText}
          />
        </div>
      )}

      {translatable && (
        <div className="pt-5 text-gray-400">
          {loading ? (
            <span>Translating...</span>
          ) : (
            <div className="flex divide-x divide-gray-200">
              <div
                className={`pr-3 ${
                  !translated ? "cursor-pointer underline" : ""
                }`}
                onClick={translate}
              >
                <span>
                  {translated ? "Translated" : "Translate"}{" "}
                  {getLocaleName(currentLocale)}
                </span>
              </div>
              {translated && (
                <div
                  className="pl-3 cursor-pointer underline"
                  onClick={revert}
                >
                  <span>{`Original (${getLocaleName(
                    defaultLocale
                  )})`}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
