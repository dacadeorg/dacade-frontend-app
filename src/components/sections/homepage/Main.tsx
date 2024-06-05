import { ReactElement } from "react";
import Section from "@/components/ui/Section";
import NumberedCard from "@/components/cards/Numbered";
import VideoPopup from "@/components/popups/Video";
import ArrowButton from "@/components/ui/button/Arrow";
import { useTranslation } from "next-i18next";
import Link from "next/link";

/**
 * Main section cards content
 * @date 4/3/2023 - 5:06:43 PM
 *
 * @type {{title: string; body: string}[]}
 */
const cards: { title: string; body: string }[] = [
  {
    title: "page.index.main.cards.first.title",
    body: "page.index.main.cards.first.body",
  },
  {
    title: "page.index.main.cards.second.title",
    body: "page.index.main.cards.second.body",
  },
  {
    title: "page.index.main.cards.third.title",
    body: "page.index.main.cards.third.body",
  },
];

/**
 * Home page main section
 * @date 4/3/2023 - 5:06:18 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function MainSection(): ReactElement {
  const { t } = useTranslation();

  return (
    <Section type="default" padding="p-0">
      <div className="w-full lg:py-24 pt-24 pb-8">
        <h1 className="lg:text-7.75xl md:text-6xl text-4.5xl lg:leading-12 leading-10 -tracking-4">{t("page.index.main.title")}</h1>
        <p className="lg:text-7.75xl md:text-6xl text-4.5xl py-2 lg:py-0 md:py-0 sm:py-0 text-gray-400 -tracking-4 lg:leading-12 leading-10">{t("page.index.main.subtitle")}</p>
      </div>
      <div className="flex justify-between">
        <div className="w-full max-w-xs hidden lg:block">
          <Link href="/communities">
            <ArrowButton minWidthClass="min-w-62" className="py-4 pl-7.5 pr-5.75" arrowClasses="text-white">
              {t("page.index.main.button")}
            </ArrowButton>
          </Link>
          <VideoPopup />
        </div>
        <div className="flex flex-col md:flex-row md:divide-y-0 divide-y-2 divide-dotted divide-gray-200 space-y-5 md:space-y-0 space-x-0 md:space-x-5 justify-end">
          {cards.map((card, i) => (
            <div key={`numbered-card-${i}`} className="w-full lg:max-w-.5xs pt-5 md:pt-0">
              <NumberedCard index={i + 1} title={t(card.title) as string} text={t(card.body) as string} />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:hidden pt-10">
        <Link href="/communities">
          <ArrowButton minWidthClass="min-w-62" className="py-4 pl-7.5 pr-5.75">
            {t("page.index.main.button")}
          </ArrowButton>
        </Link>
        <VideoPopup />
      </div>
    </Section>
  );
}
