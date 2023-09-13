import { ReactElement, useEffect } from "react";
import Avatar from "@/components/ui/Avatar";
import Tag from "@/components/ui/Tag";
import Currency from "@/components/ui/Currency";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { Community } from "@/types/community";
import { Feedback } from "@/types/feedback";
import { Submission } from "@/types/bounty";
import { IRootState } from "@/store";

/**
 * interface for CommunityStats multiSelector
 * @date 9/13/2023 - 9:20:04 AM
 *
 * @interface CommunityStatsMultiSelector
 * @typedef {CommunityStatsMultiSelector}
 */
interface CommunityStatsMultiSelector {
  community: Community | null;
  feedbacks: Feedback[];
  submissions: Submission[];
  reputation: number;
}

/**
 * community stats component
 * @returns {ReactElement}
 */
export default function CommunityStats(): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCurrentCommunity({ slug: router.query.slug as string, locale: router.locale }));
  }, [dispatch, router.query.slug, router.locale]);

  const { community, submissions, reputation, feedbacks } = useMultiSelector<unknown, CommunityStatsMultiSelector>({
    community: (state: IRootState) => state.profile.communities.current,
    feedbacks: (state: IRootState) => state.profile.communities.feedbacks,
    submissions: (state: IRootState) => state.profile.communities.submissions,
    reputation: (state: IRootState) => state.profile.communities.reputation,
  });

  return (
    <div className="bg-gray-100 sm:flex sm:justify-between rounded-3xl w-full">
      <div className="relative items-center ml-7 flex sm:flex-row">
        <Avatar icon={community?.icon} color={community?.colors.primary} size="medium" shape="rounded" />
        <div className="py-7 px-10 sm:px-7 md:px-0 md:pl-7">
          <div className="text-lg font-medium text-gray-800 pb-2">{community?.name}</div>
          <Tag>
            <Currency value={reputation} token="REP" />
          </Tag>
        </div>
      </div>
      <div className="p-7 md:text-right justify-self-stretch space-y-2">
        <div className="whitespace-nowrap">
          <span className="font-bold">{feedbacks.length}</span> {t("feedbacks")}
        </div>
        <div className="whitespace-nowrap">
          <span className="font-bold">{submissions.length}</span>{" "}
          {`${submissions.length > 1 ? t("communities.challenge.submission") + "s" : t("communities.challenge.submission")}`}
        </div>
      </div>
    </div>
  );
}
