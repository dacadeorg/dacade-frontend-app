import { ReactElement } from "react";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import Coin from "@/components/ui/Coin";
import ListIcon from "@/components/cards/community/_partials/ListIcon";
import DateManager from "@/utilities/DateManager";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { Community } from "@/types/community";

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
export default function CommunityListCard({
  community,
}: CommunityListCardProps): ReactElement {
  const { t } = useTranslation();
  const path = `/communities/${community.slug}`;

  const rewards = community.rewards.reduce((accumulator, reward) => ({
    ...accumulator,
    amount: accumulator.amount + reward.amount,
  }));

  const duration = DateManager.millisecondsToMinutes(
    community.duration
  );

  const reward = community.rewards.find(
    (reward) => reward.type === "SUBMISSION"
  );

  return (
    <ThemeWrapper className="w-full" colors={community.colors}>
      <Link href={path} className="bg-red-200">
        <div className="group w-full bg-gray-200 lg:flex min-w-full mx-0 rounded-3xl relative">
          <ListIcon community={community} />
          <div className="flex-col justify-between flex p-3 md:p-7 text-gray-700 flex-1 divide-y divide-dotted divide-gray-500">
            <div className="min-w-full">
              <div className="xl:pr-52 w-full text-base md:text-lg pb-10">
                {community.summary}
              </div>
            </div>
            <div className="space-y-5">
              <div className="md:flex flex-row justify-between">
                <div className="text-base pt-7 pb-3 md:pb-0 text-left flex-start flex flex-col">
                  <div className="flex space-x-3">
                    <div className="flex space-x-2">
                      <Coin token={reward?.token} size="normal" />
                      <div className="flex flex-col text-sm leading-tight pt-1">
                        <div className="font-normal leading-tight">
                          {t("communities.list-card.earn")}{" "}
                          <span className="font-bold">
                            {reward?.token}
                          </span>
                        </div>
                        <div className="font-light leading-tight">
                          {t(
                            community.courses !== 1
                              ? "communities.card.courses"
                              : "communities.card.course",
                            { count: community.courses }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-7 hidden md:block align-middle">
                  <Link href={path}>
                    <ArrowButton
                      rounded={false}
                      arrowClasses="group-hover:bg-primary bg-gray-200 text-primary group-hover:text-white"
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
      </Link>
    </ThemeWrapper>
  );
}
