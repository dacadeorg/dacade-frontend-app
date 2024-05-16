import { useSelector } from "@/hooks/useTypedSelector";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

/**
 * @interface SidebarProps
 * @description The props for the Sidebar component.
 */

/**
 * The Sidebar component for the application.
 * @param {} SidebarProps - The props for the Sidebar component.
 * @returns JSX.Element - The rendered Sidebar component.
 */
export default function Sidebar(): JSX.Element {
  const currentCommunity = useSelector((state) => state.communities.current);
  const hasCurrentCommunity = !!currentCommunity; // Check if currentCommunity exists
  const router = useRouter();
  const { t } = useTranslation();

  /**
   * Checks if the given link is the active (current) route.
   * @param link - The link to check.
   * @returns boolean - True if the link is the active route, false otherwise.
   */
  const isActive = (link: string) => {
    return router.asPath === link;
  };

  const scoreboardLink = hasCurrentCommunity ? `/communities/${currentCommunity.slug}/scoreboard` : "";
  const mainLink = hasCurrentCommunity ? `/communities/${currentCommunity.slug}` : "";

  return (
    <div className="flex flex-col md:divide-y divide-solid divide-gray-100 w-full text-gray-700 space-y-6">
      <Link href={mainLink}>
        <div className={isActive(mainLink) ? "" : "opacity-80"}>
          <div className="font-medium text-.5xl leading-snug">{t("communities.overview.challenges.title")}</div>
          <div className="text-sm font-light lg:w-full lg:pr-7 pt-2 mb-6 md:mb-0">{t("communities.overview.challenges.description")} </div>
        </div>
      </Link>
      {hasCurrentCommunity && (
        <Link href={scoreboardLink}>
          <div className={isActive(scoreboardLink) ? "pt-5" : "opacity-80 md:block hidden scroll-smooth pt-5"}>
            <div className="font-medium text-.5xl leading-snug">{t("communities.overview.scoreboard.title")}</div>
            <div className="text-sm font-light lg:w-full lg:pr-7 pt-2 mb-6 md:mb-0">{t("communities.overview.scoreboard.description")}</div>
          </div>
        </Link>
      )}
    </div>
  );
}
