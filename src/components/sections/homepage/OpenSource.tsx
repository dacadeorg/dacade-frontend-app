import Link from "next/link";
import ArrowRightIcon from "@/icons/arrow-right.svg";
import { useTranslation } from "next-i18next";

/**
 * Open source section
 * @date 3/27/2023 - 5:26:28 PM
 *
 * @export
 * @returns {ReactElement}
 */

export default function OpenSource() {
  const { t } = useTranslation();
  return (
    <div className="text-4xl lg:text-5xl leading-10 lg:leading-13.4 pt-24 flex flex-col text-wrap space-y-2 -tracking-2 md:-tracking-6 xl:-tracking-2">
      <p >
        {t("footer.open.source")}
        <br className="block md:hidden lg:block" />
        <Link href="https://github.com/dacadeorg/dacade-frontend-app" target="_blank" className="text-primary items-center space-x-2">
          <span> {t("footer.open.source.contribute")}</span>
          <ArrowRightIcon className="w-6.5 h-5.5 inline-flex" />
        </Link>
      </p>
    </div>
  );
}
