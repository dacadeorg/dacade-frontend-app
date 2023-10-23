import { useSelector } from "@/hooks/useTypedSelector";
import Avatar from "@/components/ui/Avatar";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import Right from "@/icons/angle-right.svg";

/**
 * Request component
 * @date 3/30/2023 - 3:56:57 PM
 *
 * @export
 * @returns {}
 */
export default function Request(): ReactElement {
  const referrals = useSelector((state) => state.userReferrals.userReferralList);
  const previewList = referrals.slice(0, 3);
  const router = useRouter();

  const onClick = () => {
    router.push("/profile/referrals");
  };

  return (
    <div className="flex items-center justify-between text-sm ">
      <div className={`relative flex text-gray-500 items-center divide-x divide-solid ${referrals && referrals.length ? "" : "hidden"}`}>
        <div className="flex pr-3 items-center">
          <div className="cursor-pointer" onClick={onClick}>
            {previewList?.map((referral, index) => (
              <Avatar key={referral.id} className={`border-2 border-solid border-white ${index > 0 && "-ml-3"}`} hideVerificationBadge useLink={false} user={referral.user} />
            ))}
          </div>
          <div className="relative pl-3  font-normal cursor-pointer md:flex md:font-medium" onClick={onClick}>
            <span className="md:inline-block">{referrals?.length} Friends have used your invite code</span>
          </div>
        </div>

        <div className="pl-4">4 Pending invitations</div>
      </div>
      <a className="text-primary flex items-center justify-between gap-4 cursor-pointer">
        {" "}
        <span>See all</span>
        <Right />
      </a>
    </div>
  );
}
