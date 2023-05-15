import { useSelector } from "@/hooks/useTypedSelector";
import Avatar from "@/components/ui/Avatar";
import { ReactElement } from "react";
import { useRouter } from "next/router";

/**
 * Request component
 * @date 3/30/2023 - 3:56:57 PM
 *
 * @export
 * @returns {}
 */
export default function Request(): ReactElement {
  const referrals = useSelector((state) => state.referrals.list);
  const previewList = referrals.slice(0, 3);
  const router = useRouter();

  const onClick = () => {
    router.push("/profile/referrals");
  };

  return (
    <div className={`relative flex items-center ${referrals && referrals.length ? "" : "hidden"}`}>
      <div className="flex pr-3 cursor-pointer" onClick={onClick}>
        {previewList.map((referral, index: number) => (
          <Avatar
            key={index}
            className={`border-2 border-solid border-white ${index > 0 ? "-ml-3" : ""}`}
            useLink={false}
            // TODO: figure out how to get this user because on the referral there is no user present
            // user={referral.user}
          />
        ))}
      </div>
      <div className="relative text-sm font-normal text-gray-500 cursor-pointer md:flex md:font-medium" onClick={onClick}>
        <span className="md:inline-block">{referrals.length} Friends have used your invite code</span>
      </div>
    </div>
  );
}
