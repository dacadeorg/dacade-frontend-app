import { ReactElement } from "react";
import Avatar from "@/components/ui/Avatar";
import Tag from "@/components/ui/Tag";
import Currency from "@/components/ui/Currency";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";

/**
 * community stats component
 * @returns {ReactElement}
 */
export default function CommunityStats(): ReactElement {
  const { t } = useTranslation();

  const { community, submissions } = useSelector((state) => ({
    community: state.communities.current,
    // TODO: Will be uncommented when the feedback slice is implemented
    feedbacks: state.feedback.list,
    submissions: state.submissions.list,
    reputation: state.profile.reputations.list,
  }));

  console.log("community", community);

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
