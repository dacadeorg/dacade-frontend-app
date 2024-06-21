import Button from "@/components/ui/button";
import { useTranslation } from "next-i18next";

/**
 * PartneringCard component
 * @date 3/30/2023 - 4:03:28 PM
 *
 * @export
 * @returns {*}
 */
export default function PartneringCard() {
  const { t } = useTranslation();
      return (
        <div className="relative z-10 mt-6 md:mt-0 p-6 rounded-3.5xl border border-solid bg-surface-bg-highlight lg:pb-3 w-full text-surface-text-brand h-full min-h-xs flex flex-col justify-between divide-y-2 divide-dotted divide-theme-accent">
          <div className="max-w-sm">
            <p className="text-2xl font-medium mb-2.5 leading-none">{t("page.index.communities.partnering.title")}</p>
            <p className="text-base mt-0 mb-20 lg:mb-0 leading-normal">{t("page.index.communities.partnering.subtitle")}</p>
          </div>
          <div className="mt-4 flex-none md:flex justify-between">
            <div className="md:flex md:flex-col space-y-0">
              <div className="mt-4 font-light text-theme-accent md:w-48">{t("partnering.card.text")}</div>
            </div>
            <div className="mt-4 align-middle">
              <a href="mailto:moritz@dacade.org">
                <Button className="hover:bg-brand group-hover:text-white leading-relaxed lg:px-7 px-5 font-medium" variant="outline-primary" type="button" padding={false}>
                  {t("page.index.communities.partnering.button-text")}
                </Button>
              </a>
            </div>
          </div>
        </div>
      );

}
