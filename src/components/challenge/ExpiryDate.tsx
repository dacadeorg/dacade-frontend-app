import { useTranslation } from "next-i18next";
import { ReactElement } from "react-markdown/lib/react-markdown";

/**
 * Expiration date component
 * @date 7/31/2023 - 10:04:36 AM
 *
 * @export
 * @param {string} { expiresAt }
 * @returns {ReactElement}
 */
export default function ExpiryDate({ expiresAt }: { expiresAt?: string }): ReactElement {
  const { t } = useTranslation();
  return (
    <div className="bg-gray-50 py-6 px-3 md:py-9 md:px-3 border rounded border-solid border-gray-200 flex items-center justify-start md:justify-center">
      <p className="text-gray-700 flex flex-col md:flex-row mx-auto items-center gap-1 text-sm">
        {t("communities.overview.challenge.expiry")}
        <span className="font-medium text-center">{expiresAt}</span>
      </p>
    </div>
  );
}
