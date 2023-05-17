import Referral from "@/components/cards/Referral";
import Bounty from "@/components/cards/Bounty";
import { Bounty as BountyType } from "@/types/bounty";
import { ReactElement, useEffect } from "react";
import { Referral as ReferralType } from "@/types/community";

/**
 * BountyList component props
 * @date 4/3/2023 - 12:24:17 PM
 *
 * @interface BountyListProps
 * @typedef {BountyListProps}
 */
interface BountyListProps {
  bounties: BountyType[];
  referrals: ReferralType[];
}

/**
 * BountyList component
 * @date 4/3/2023 - 12:23:44 PM
 *
 * @export
 * @param {BountyListProps} {
  bounties = [],
  referrals = [],
}
 * @returns {ReactElement}
 */
export default function BountyList({ bounties = [], referrals = [] }: BountyListProps): ReactElement {
  return (
    <div>
      {bounties && (
        <div className="relative w-full px-0 mb-10 space-y-0 overflow-hidden divide-y divide-gray-200 bg-gray-50 rounded-3xl lg:max-w-2xl">
          {referrals.map((referral) => (
            <Referral referral={referral} key={referral.name} />
          ))}
          {bounties.map((bounty) => (
            <Bounty bounty={bounty} key={bounty.id} />
          ))}
        </div>
      )}
    </div>
  );
}
