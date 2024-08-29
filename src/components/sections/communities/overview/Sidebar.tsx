import { useSelector } from "@/hooks/useTypedSelector";
import CommunityNavItem from "./_partials/NavItem";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import classNames from "classnames";
import { useCallback, useMemo } from "react";

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
  const isActive = useCallback(
    (link: string) => {
      return router.asPath === link;
    },
    [router.asPath]
  );

  const links = useMemo(() => {
    if (!hasCurrentCommunity)
      return {
        scoreboardLink: "",
        learningMaterialsLink: "",
        mainLink: "",
      };
    const { slug } = currentCommunity;
    return {
      scoreboardLink: `/communities/${slug}/scoreboard`,
      learningMaterialsLink: `/communities/${slug}/learning-materials`,
      mainLink: `/communities/${slug}`,
    };
  }, [hasCurrentCommunity, currentCommunity]);

  return (
    <div className="flex flex-col md:divide-y divide-solid divide-gray-100 w-full text-gray-700 space-y-6">
      <CommunityNavItem
        url={links.mainLink}
        title={t("communities.overview.challenges.title")}
        description={t("communities.overview.challenges.description")}
        className={isActive(links.mainLink) ? "" : "text-tertiary"}
      />
      <CommunityNavItem
        url={links.learningMaterialsLink}
        title={t("communities.overview.learning-materials.title")}
        description={t("communities.overview.learning-materials.description")}
        className={classNames("pt-6", {
          "text-tertiary": !isActive(links.learningMaterialsLink),
        })}
      />
      {hasCurrentCommunity && (
        <CommunityNavItem
          url={links.scoreboardLink}
          title={t("communities.overview.scoreboard.title")}
          description={t("communities.overview.scoreboard.description")}
          className={classNames("pt-6", {
            "md:block hidden scroll-smooth": isActive(links.scoreboardLink),
            "text-tertiary": !isActive(links.scoreboardLink),
          })}
        />
      )}
    </div>
  );
}
