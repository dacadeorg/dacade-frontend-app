import { ReactElement, useMemo } from "react";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import Coin from "@/components/ui/Coin";
import ListIcon from "@/components/cards/community/_partials/ListIcon";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";
import { useRouter } from "next/router";

/**
 * Interface for CommunityListCard component props
 * @date 3/30/2023 - 3:47:38 PM
 *
 * @interface CommunityListCardProps
 * @typedef {CommunityListCardProps}
 */
interface CommunityListCardProps {
  community: Community;
}

/**
 * CommunityListCard component
 * @date 3/30/2023 - 3:48:09 PM
 *
 * @export
 * @param {CommunityListCardProps} {
  community,
}
 * @returns {ReactElement}
 */
export default function CommunityListCard({ community }: CommunityListCardProps): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const path = `/communities/${community.slug}`;

  const reward = useMemo(() => {
    return community.rewards.find((reward) => reward.type === "SUBMISSION");
  }, [community.rewards]);

  return (
    <ThemeWrapper className="w-full" colors={community.colors}>
      <div onClick={() => router.push(path)} className="cursor-pointer">
        <div className="group w-full bg-gray-200 lg:flex min-w-full mx-0 rounded-3xl relative">
          <ListIcon community={community} />
          <div className="flex-col justify-between flex p-3 md:p-7 text-gray-700 flex-1 divide-y divide-dotted divide-gray-500">
            <div className="min-w-full">
              <div className="xl:pr-52 w-full text-base md:text-lg pb-10">{community.summary}</div>
            </div>
            <div className="space-y-5">
              <div className="md:flex flex-row justify-between">
                <div className="text-base pt-7 pb-3 md:pb-0 text-left flex-start flex flex-col">
                  <div className="flex space-x-3">
                    <div className="flex space-x-2">
                      <Coin token={reward?.token} size="normal" />
                      <div className="flex flex-col text-sm leading-tight pt-1">
                        <div className="font-normal leading-tight">
                          {t("communities.list-card.earn")} <span className="font-bold">{reward?.token}</span>
                        </div>
                        <div className="font-light leading-tight">
                          {t(community.challenges > 1 ? "communities.card.challenges" : "communities.card.challenge", { count: community.challenges })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-7 hidden md:block align-middle">
                  <Link href={path}>
                    <ArrowButton
                      rounded={false}
                      className="group-hover:bg-brand group-hover:text-white"
                      arrowClasses="group-hover:bg-brand bg-gray-200 text-brand group-hover:text-white"
                      variant="outline-primary"
                      loading={false}
                      disabled={false}
                      communityStyles={false}
                      direction="right"
                    >
                      {t("page.index.main.button")}
                    </ArrowButton>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
