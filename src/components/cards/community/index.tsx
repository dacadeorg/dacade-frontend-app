import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import Image from "next/image";
import RewardBadge from "./_partials/RewardBadge";
import { ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";

/**
 * Interface for cummunity props
 * @date 3/30/2023 - 3:01:14 PM
 *
 * @interface CommunityProps
 * @typedef {CommunityProps}
 */
interface CommunityProps {
  showRewards?: boolean;
  community: Community;
}

/**
 * Community card function, which depend on _partials/RewardBadge and other components
 * @date 3/30/2023 - 3:01:34 PM
 *
 * @export
 * @param {CommunityProps} {
  showRewards = true,
  community,
}
 * @returns {ReactElement}
 */
export default function CommunityCard({
  showRewards = true,
  community,
}: CommunityProps): ReactElement {
  const { t } = useTranslation();
  const path = `/communities/${community?.slug}`;

  const reward = community.rewards.filter(
    (reward) => reward.type === "SUBMISSION"
  )[0];

  return (
    <ThemeWrapper colors={community.colors}>
      <Link href={path} className="block h-full">
        <div className="flex flex-col h-full p-6 pb-3 space-y-5 divide-y-2 group bg-theme-primary text-theme-text divide-dotted divide-theme-accent">
          <div className="flex-grow">
            <div className="flex flex-col justify-between space-y-5 sm:flex-row lg:flex-col 2xl:flex-row">
              <div className="text-.5xl md:text-2xl max-w-sm min-h-2xs md:min-h-3xs lg:min-h-2xs xl:min-h-2xs font-medium pb-5">
                <h1 className="tracking-tight max-w-text-xs text-theme-text">
                  {community.name}
                </h1>
                <p className="pr-2 tracking-tight md:max-w-text-md text-theme-accent">
                  {community.description || ""}
                </p>
              </div>
              <div className="self-end max-w-lg sm:h-full sm:-mb-0 md:mb-2 md:h-auto">
                <Image
                  src={"/static/" + community.icon}
                  className="relative mb-5 h-44 w-44"
                  alt=""
                  width={56}
                  height={56}
                />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start max-w-xs -mt-4 md:flex-row lg:flex-col md:-mt-7 md:max-w-lg">
              {showRewards && reward && (
                <div className="text-sm">
                  <RewardBadge reward={{ token: reward.token }} />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between flex-none mt-4">
            <div className="flex flex-col space-y-0">
              <div className="mt-4 font-medium text-theme-accent">
                {t("communities.card.earn")}
              </div>
              <div className="mt-4 font-light text-theme-accent">
                {t(
                  community.courses !== 1
                    ? "communities.card.courses"
                    : "communities.card.course",
                  { count: community.courses }
                )}
              </div>
            </div>
            <div className="mt-4 align-middle">
              <Link href={path}>
                <ArrowButton arrowClasses="border group-hover:bg-theme-accent bg-theme-primary text-theme-accent group-hover:text-theme-primary border-theme-accent">
                  {t("page.index.main.button")}
                </ArrowButton>
              </Link>
            </div>
          </div>
        </div>
      </Link>
    </ThemeWrapper>
  );
}
