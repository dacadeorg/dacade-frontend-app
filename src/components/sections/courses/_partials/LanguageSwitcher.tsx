import { useRouter } from "next/router";
import { ReactElement, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * LanguageSwitcher component
 * @date 4/18/2023 - 12:25:22 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function LanguageSwitcher(): ReactElement {
  const { t } = useTranslation();
  const { locales } = useRouter();

  const show = process.env.NEXT_PUBLIC_SHOW_LANGUAGE_SELECTOR;

  const [currentLocale, setcurrentLocale] = useState<string>("");

  return locales && locales.length > 1 && show ? (
    <div className="flex flex-col divide-y divide-yellow-100 message-rectangle divide-solid">
      <div className="pb-4">
        {t("communities.navigation.language.text")}
      </div>

      <div>
        <select
          onChange={(e) => setcurrentLocale(e.target.value)}
          value={currentLocale}
          className="outline-none translation focus:outline-none"
        >
          {locales.map((locale) => {
            return (
              <option key={locale} value={locale}>
                {locale}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  ) : (
    <></>
  );
}
