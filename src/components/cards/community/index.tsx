import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import Image from "next/image";
import RewardBadge from "./_partials/RewardBadge";
import { ReactElement, useMemo } from "react";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";
import { useRouter } from "next/router";
import hexToRgba from "hex-to-rgba";

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
export default function CommunityCard({ showRewards = true, community }: CommunityProps): ReactElement {
  const { t } = useTranslation();
  const path = `/communities/${community?.slug}`;
  const router = useRouter();

  const reward = useMemo(() => {
    return community.rewards.find((reward) => reward.type === "SUBMISSION");
  }, [community.rewards]);

  const colors = useMemo(() => {
    if (!community.colors) return null;
    return {
      primary: community.colors.cover?.background || community.colors.primary,
      text: community.colors?.cover?.text || community.colors.text,
      accent: community.colors.accent,
    };
  }, [community.colors]);

  const rewardBadgeStyle = useMemo(() => {
    if (!colors) return;
    return {
      backgroundColor: hexToRgba(colors.text, 0.3),
      color: colors.text,
    };
  }, [colors]);

  const renderCommunityMetrics = () => {
    if (community.challenges) {
      return t(community.challenges !== 1 ? "communities.card.challenges" : "communities.card.challenge", { count: community.challenges });
    }
    return t(community.courses !== 1 ? "communities.card.courses" : "communities.card.course", { count: community.courses });
  };

  return (
    <ThemeWrapper colors={community.colors}>
      <div onClick={() => router.push(path)} className="block h-full hover:cursor-pointer">
        <div className="flex flex-col h-full p-6 pb-3 space-y-5 divide-y-2 group bg-theme-primary text-theme-text divide-dotted divide-theme-accent">
          <div className="flex-grow">
            <div className="flex flex-col justify-between space-y-5 sm:flex-row lg:flex-col 2xl:flex-row">
              <div className="text-.5xl md:text-2xl max-w-sm min-h-2xs md:min-h-3xs lg:min-h-2xs xl:min-h-2xs font-medium pb-5">
                <h1 className="tracking-tight max-w-text-xs text-theme-text">{community.name}</h1>
                <p className="pr-2 tracking-tight md:max-w-text-md text-theme-accent">{community.description || ""}</p>
              </div>
              <div className="self-end max-w-lg sm:h-full sm:-mb-0 md:mb-2 md:h-auto">
                <Image src={community.icon} className="relative mb-5 h-44 w-44" alt="" width={56} height={56} />
              </div>
            </div>
            <div className="flex flex-col items-start justify-start max-w-xs -mt-4 md:flex-row lg:flex-col md:-mt-7 md:max-w-lg">
              {showRewards && reward && (
                <div className="text-sm flex">
                  <RewardBadge reward={{ token: reward.token }} styles={rewardBadgeStyle} />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between flex-none mt-4">
            <div className="flex flex-col space-y-0">
              <div className="mt-4 font-medium text-theme-accent">{t("communities.card.earn")}</div>
              <div className="mt-4 font-light text-theme-accent">{renderCommunityMetrics()}</div>
            </div>
            <div className="mt-4 align-middle">
              <Link href={path}>
                <ArrowButton
                  variant="outline-gray"
                  loading={false}
                  className="border group-hover:bg-theme-accent bg-theme-primary text-theme-accent group-hover:text-theme-primary border-theme-accent"
                  arrowClasses="group-hover:bg-theme-accent bg-theme-primary text-theme-accent group-hover:text-theme-primary "
                >
                  {t("page.index.main.button")}
                </ArrowButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
