import Reward from "@/components/badges/RewardBadge";
import Avatar from "@/components/ui/Avatar";
import { Community } from "@/types/community";
import { Reward as IReward } from "@/types/course";
import { ReactElement } from "react";

/**
 * Referral type
 * @date 4/4/2023 - 10:38:53 AM
 *
 * @typedef {Referral}
 */
type Referral = {
  community: Community;
  title?: string;
  reward: IReward;
};

/**
 * Referral list item props interface
 * @date 4/4/2023 - 10:36:32 AM
 *
 * @interface ReferralListItemProps
 * @typedef {ReferralListItemProps}
 */
interface ReferralListItemProps {
  referral: Referral;
  bounty?: boolean;
}

/**
 * Referral List item component
 * @date 4/4/2023 - 10:38:08 AM
 *
 * @export
 * @param {ReferralListItemProps} {
  referral,
  bounty = false,
}
 * @returns {ReactElement}
 */
export default function ReferralListItem({ referral, bounty = false }: ReferralListItemProps): ReactElement {
  return (
    <div className="flex justify-between w-full items-center text-gray-900">
      <div className="flex items-center">
        <Avatar
          className="w-6 h-6 rounded overflow-hidden"
          icon={referral.community.icon}
          image={referral.community.image}
          color={referral.community.colors?.cover?.background || referral.community.colors.primary}
          size="mini"
          shape="squared"
        />
        <div className="font-medium text-sm leading-relaxed ml-2">{!bounty ? referral.title || referral.community.name : referral.community.name}</div>
      </div>
      <div>
        <Reward type="gray" reward={!bounty ? referral.reward : referral.community.reward} />
      </div>
    </div>
  );
}
