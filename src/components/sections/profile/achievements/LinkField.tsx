import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";

/**
 * Achievement link field props
 * @date 5/3/2023 - 1:27:56 PM
 *
 * @interface AchievementLinkFieldProps
 * @typedef {AchievementLinkFieldProps}
 */
interface AchievementLinkFieldProps {
  link: string | null;
  testId?: string
}

/**
 * Achievement link field
 * @date 5/3/2023 - 1:27:40 PM
 *
 * @export
 * @param {AchievementLinkFieldProps} {
  link,
}
 * @returns {*}
 */
export default function AchievementLinkField({ link, testId = "achievementLinkId" }: AchievementLinkFieldProps): ReactElement {
  const { t } = useTranslation();
  const [fullLink, setFullink] = useState("");

  useEffect(() => {
    const pathName = link?.split("https://dacade.org/")[1];
    if (typeof window !== "undefined") {
      setFullink(`${window.location.origin}/${pathName}`);
    }
  }, [link]);

  const copy = () => navigator.clipboard.writeText(link as string);

  return (
    <div data-testid={testId} className="border relative p-2 rounded">
      <p className="text-gray-500 line-clamp-1 break-all flex-1 text-sm md:text-base overflow-hidden" onClick={copy}>
        {link}
      </p>
      <div className="bg-gradient-to-l input-background absolute h-full w-40 top-0 flex justify-end items-center pr-2 right-0">
        <Link href={fullLink}>
          <button className="p-1 py-0 bg-white border border-blue-600 text-blue-600">{t("profile.achievement.open")}</button>
        </Link>
      </div>
    </div>
  );
}
