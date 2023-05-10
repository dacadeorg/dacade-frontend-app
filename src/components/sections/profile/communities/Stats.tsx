import { ReactElement, useEffect } from "react";
import Avatar from "@/components/ui/Avatar";
import Tag from "@/components/ui/Tag";
import Currency from "@/components/ui/Currency";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { fetchCurrentCommunity } from "@/store/services/community.service";
import { useTranslation } from "next-i18next";

/**
 * community stats component
 * @returns {ReactElement}
 */
export default function CommunityStats({ params }: { params: string }): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentCommunity({ slug: params }));
  }, [dispatch, params]);

  const { community, submissions, reputation } = useSelector((state) => ({
    community: state.communities.current,
    // TODO: Will be uncommented when the feedback slice is implemented
    //    feedbacks :state.communities.feedbacks,
    submissions: state.submissions.list,
    reputation: state.profile.reputations.list,
  }));

  return (
    <div className="bg-gray-100 sm:flex sm:justify-between rounded-3xl lg:max-w-lg">
      <div className="relative items-center ml-7 flex sm:flex-row">
        <Avatar icon={community?.icon} color={community?.colors.primary} size="medium" shape="rounded" />
        <div className="py-7 px-10 sm:px-7 md:px-0 md:pl-7">
          <div className="text-lg font-medium text-gray-800 pb-2">{community?.name}</div>
          <Tag>
            {/* TODO: Value is given zero as a placeholder, the value will come from the feedbacks */}
            <Currency value={0} token="REP" />
          </Tag>
        </div>
      </div>
      <div className="p-7 md:text-right justify-self-stretch space-y-2">
        <div className="whitespace-nowrap">
          {/* TODO: Will be uncommented when the feedback slice is implemented */}
          {/* <span className="font-bold">{feedbacks.length}</span> */}
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
