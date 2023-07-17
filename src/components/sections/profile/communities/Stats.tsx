import { ReactElement, useEffect } from "react";
import Avatar from "@/components/ui/Avatar";
import Tag from "@/components/ui/Tag";
import Currency from "@/components/ui/Currency";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

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

  const { community, submissions, reputation, feedbacks } = useSelector((state) => ({
    community: state.profile.communities.current,
    feedbacks: state.profile.communities.feedbacks,
    submissions: state.profile.communities.submissions,
    reputation: state.profile.communities.reputation,
  }));

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
          <span className="font-bold">{feedbacks.length}</span>
          {t("feedbacks")}
        </div>
        <div className="whitespace-nowrap">
          <span className="font-bold">{submissions.length}</span>
          {t("communities.challenge.submission")}
        </div>
      </div>
    </div>
  );
}
