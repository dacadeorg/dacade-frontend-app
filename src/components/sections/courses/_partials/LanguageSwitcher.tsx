import { useRouter } from "next/router";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { t } = useTranslation();
  const { locales } = useRouter();

  const show = process.env.NUXT_ENV_SHOW_LANGUAGE_SELECTOR === "true";

  const [currentLocale, setcurrentLocale] = useState<string>();

  return locales && locales.length > 1 && show ? (
    <div className="message-rectangle flex flex-col divide-y divide-solid divide-yellow-100">
      <div className="pb-4">
        {t("communities.navigation.language.text")}
      </div>

      <div>
        <select
          onChange={(e) => setcurrentLocale(e.target.value)}
          value={currentLocale}
          className="translation outline-none focus:outline-none"
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
  ) : null;
}
