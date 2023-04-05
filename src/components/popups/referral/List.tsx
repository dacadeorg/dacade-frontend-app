import { useSelector } from "@/hooks/useTypedSelector";
import ListItem from "./ListItem";
import { ReactElement } from "react";

/**
 * Referral list component 
 * @date 4/4/2023 - 11:38:41 AM
 *
 * @export
 * @param {{
  bounty?: boolean;
}} {
  bounty = false,
}
 * @returns {ReactElement}
 */
export default function ReferralList({
  bounty = false,
}: {
  bounty?: boolean;
}): ReactElement {
  const referrals = useSelector((state) => state.referrals.list);

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-3 text-gray-500">
        <div className="uppercase text-xs font-semibold">
          modal.referral.list.bounty_title
        </div>
        <div className="text-sm font-normal">
          {bounty
            ? "modal.referral.list.challenge"
            : "modal.referral.list.reward"}
        </div>
      </div>
      <div className="flex flex-col space-y-2">
        {referrals.map((referral) => (
          <ListItem
            key={referral.name}
            referral={referral}
            bounty={bounty}
          />
        ))}
      </div>
    </div>
  );
}
