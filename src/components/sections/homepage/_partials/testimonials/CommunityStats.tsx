import Button from "@/components/ui/button";
import DiscordIcon from "@/icons/discord.svg";
import { useTranslation } from "next-i18next";
import { useMemo } from "react";

/**
 * Statistic interface definitions
 * @date 4/3/2023 - 6:41:08 PM
 *
 * @interface Statistic
 * @typedef {Statistic}
 */
interface Statistic {
  title: string;
  description: string;
  count: number;
}
const stats: Statistic[] = [
  {
    title: "testimonials.community.stats.card-1.title",
    description: "testimonials.community.stats.card-1.description",
    count: 22240,
  },
  {
    title: "testimonials.community.stats.card-2.title",
    description: "testimonials.community.stats.card-2.description",
    count: 3595,
  },
  {
    title: "testimonials.community.stats.card-3.title",
    description: "testimonials.community.stats.card-3.description",
    count: 8131,
  },
];
export default function CommunityStats() {
  const { t } = useTranslation();
  const digitFormatter = useMemo(() => new Intl.NumberFormat(), []);

  const formattedStat = useMemo(
    () =>
      stats.map((stat: Statistic) => ({
        ...stat,
        count: digitFormatter.format(stat.count),
      })),
    [digitFormatter]
  );

  return (
    <div className="p-7 bg-primary rounded-3.5xl mx-auto text-white relative md:absolute md:top-28 lg:top-32 xl:w-1/3 md:w-4/6 z-10 sm:max-w-sm">
      <h3 className="m-0 text-4.5xl w-3/4">{t("testimonials.community.title")}</h3>
      <div className="relative divide-y divide-white divide-dotted">
        {formattedStat.map((stat) => (
          <div key={stat.title} className="py-6">
            <span className="block text-.5xl mb-2">{stat.count}</span>
            <p className="text-base w-3/4 m-0">
              <span className="font-graphik font-medium">{t(stat.title)}</span> {t(stat.description)}
            </p>
          </div>
        ))}
      </div>
      <a target="_blank" href="https://discord.gg/U38KQHDtHe">
        <Button variant="outline-white">
          {t("testimonials.community.join", {
            appName: t("app.name"),
          })}
          <DiscordIcon className="ml-3 align-middle h-6 inline-block" />
        </Button>
      </a>
    </div>
  );
}
