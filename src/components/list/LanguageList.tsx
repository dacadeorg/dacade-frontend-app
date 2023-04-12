import Checkmark from "@/icons/checkmark.svg";
import classNames from "classnames";
import { useRouter } from "next/router";
import { ReactElement } from "react";
import { useTranslation } from "next-i18next";

/**
 * This Language list component responsible for switching languages 
 * @date 3/28/2023 - 3:17:38 PM
 *
 * @export
 * @returns {ReactElement}
 */


export default function LanguageList(): ReactElement {
  const router = useRouter();
  const availableLocales: string[] | undefined = router.locales;
  const selected = router.locale;
  const { t } = useTranslation();

  /**
   * switchLocalePath is used to switch the locale of a website and update the URL according to the language.
   * @date 3/28/2023 - 3:19:13 PM
   *
   * @param {string} locale
   */
  const switchLocalePath = (locale: string): void  =>  {
    router.push(router.asPath, router.asPath, { locale: locale });
  }

  return (
    <div className="text-left p-4">
      <span className="uppercase block text-xs font-semibold text-gray-500 leading-relaxed">
        {t("nav.language")}
      </span>
      <div className="space-y-4 mt-2">
        {availableLocales?.map((locale) => (
          <div
            key={locale}
            className={classNames("flex justify-between cursor-pointer", {
              "text-gray-500": locale !== selected,
            })}
          >
            <div>
              <span
                onClick={() => switchLocalePath(locale)}
                className={classNames({
                  "font-medium": locale === selected,
                  "font-normal": locale !== selected,
                })}
              >
                {locale}
              </span>
            </div>
            {locale === selected && (
              <div className="text-primary">
                <Checkmark />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
