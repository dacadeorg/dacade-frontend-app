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
    <div className="relative lg:mt-0 xl:pt-0 rounded-3.5xl overflow-hidden mt-5 md:mt-0 border border-solid border-gray-light md:border-none">
      <div className="relative z-10 p-6 lg:pb-3 w-full text-primary h-full min-h-xs flex flex-col justify-between">
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
              <Button className="hover:bg-primary group-hover:text-white leading-relaxed lg:px-7 px-5 font-medium" variant="outline-primary" type="button" padding={false}>
                {t("page.index.communities.partnering.button-text")}
              </Button>
            </a>
          </div>
        </div>
      </div>
      <span className="block absolute top-0 left-0 bg-primary opacity-5 z-0 w-full h-full" />
    </div>
  );
}
