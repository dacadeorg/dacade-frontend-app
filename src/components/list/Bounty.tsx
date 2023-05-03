import Referral from "@/components/cards/Referral";
import Bounty from "@/components/cards/Bounty";
import { Bounty as IBounty } from "@/types/bounty";
import { Refferral } from "@/types/referral";
import { ReactElement } from "react";

/**
 * BountyList component props
 * @date 4/3/2023 - 12:24:17 PM
 *
 * @interface BountyListProps
 * @typedef {BountyListProps}
 */
interface BountyListProps {
  bounties: IBounty[];
  referrals: Refferral[];
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
        <div className="divide-y bg-gray-50 rounded-3xl space-y-0 divide-gray-200 px-0 mb-10 relative w-full lg:max-w-2xl overflow-hidden">
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
