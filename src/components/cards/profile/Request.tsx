import { useMultiSelector } from "@/hooks/useTypedSelector";
import Avatar from "@/components/ui/Avatar";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import Right from "@/icons/angle-right.svg";
import Link from "next/link";
import { Referral } from "@/types/community";
import { IRootState } from "@/store";

interface ReferralsMultiSelector {
  referrals: Referral[];
  count: number;
}

/**
 * Request component
 * @date 3/30/2023 - 3:56:57 PM
 *
 * @export
 * @returns {}
 */
export default function Request(): ReactElement {
  const { referrals, count } = useMultiSelector<unknown, ReferralsMultiSelector>({
    referrals: (state: IRootState) => state.userReferrals.userReferralList,
    count: (state: IRootState) => state.userReferrals.count,
  });
  const previewList = referrals.slice(0, 3);
  const router = useRouter();

  const onClick = () => {
    router.push("/profile/referrals");
  };

  return (
    <div className="md:flex items-center justify-between text-sm ">
      <div className={`relative md:flex text-gray-500 items-center md:divide-x divide-solid ${referrals && referrals.length ? "" : "hidden"}`}>
        <div className="flex pr-3 items-center">
          <div className="cursor-pointer flex" onClick={onClick}>
            {previewList?.map((referral, index) => (
              <Avatar key={referral.id} className={`border-2 border-solid border-white ${index > 0 && "-ml-3"}`} hideVerificationBadge useLink={false} user={referral.user} />
            ))}
          </div>
          <div className="relative pl-3  font-normal cursor-pointer md:flex md:font-medium" onClick={onClick}>
            <span className="md:inline-block">{count} Friends have used your invite code</span>
          </div>
        </div>

        <div className="md:pl-4 py-4 md:py-0">4 Pending invitations</div>
      </div>
      <Link href={`/profile/referrals`} className="text-brand flex items-center justify-between gap-4 cursor-pointer">
        <span>See all</span>
        <Right />
      </Link>
    </div>
  );
}
