import { useSelector } from "@/hooks/useTypedSelector";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageSelector = () => {
  const { t } = useTranslation("communities.navigation.language");
  //const { course } = useSelector((state) => state.communities.courses);
  const [availableLocales, setAvailableLocales] = useState<any>({});
  const selected = "en"; // replace with your default locale
  const show = process.env.NEXT_ENV_SHOW_LANGUAGE_SELECTOR === "true";

  //   course.translations?.forEach((translation: any) => {
  //     if (translation) {
  //       availableLocales[translation.locale] = {
  //         id: translation.id,
  //         code: translation.locale,
  //         name: t(`locales.${translation.locale}`),
  //       };
  //     }
  //   });

  const locales = Object.values(availableLocales);

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const locale = event.target.value;
    if (locale !== selected) {
      // set locale using i18n library
    }
  };

  return (
    locales.length > 1 &&
    show && (
      <div className="message-rectangle flex flex-col divide-y divide-solid divide-yellow-100">
        <div className="pb-4">{t("text")}</div>
        <div>
          <select
            value={selected}
            onChange={handleChange}
            className="translation outline-none focus:outline-none"
          >
            {locales.map((locale: any) => (
              <option key={locale.id} value={locale.code}>
                {locale.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  );
};

export default LanguageSelector;
