import Avatar from "@/components/ui/Avatar";
import Currency from "@/components/ui/Currency";
import { Community } from "@/types/community";
import { ReactElement } from "react";
import { User } from "@/types/bounty";
import Link from "next/link";

/**
 * Interface for the reputation card props
 * @date 3/29/2023 - 11:31:21 AM
 *
 * @interface ReputationCardProps
 * @typedef {ReputationCardProps}
 */
interface ReputationCardProps {
  user?: User;
  details: {
    community?: Community;
    score?: number;
  };
}

/**
 * Component for the Reputation card
 * @date 3/29/2023 - 11:31:51 AM
 *
 * @export
 * @param {ReputationCardProps} {
  details = {},
}
 * @returns {ReactElement}
 */
export default function ReputationCard({ details = {} }: ReputationCardProps): ReactElement {
  return (
    <div className="flex space-x-3 text-left hover:bg-gray-50 pb-3 -mx-5 px-5">
      <Avatar icon={details.community?.icon} color={details.community?.colors?.cover?.background || details.community?.colors.primary} size="medium" shape="rounded" />
      {details?.score && (
        <Link href={details?.community ? `/communities/${details.community.slug}` : ""} className="pt-1">
          <span className="block text-base font-medium leading-normal">
            <Currency value={details.score} token="REP" />
          </span>
          <span className="block font-normal text-sm">{details.community?.name}</span>
        </Link>
      )}
    </div>
  );
}
