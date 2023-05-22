import { useSelector } from "@/hooks/useTypedSelector";
import Avatar from "@/components/ui/Avatar";
import { ReactElement } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

/**
 * Request component
 * @date 3/30/2023 - 3:56:57 PM
 *
 * @export
 * @returns {}
 */
export default function Request(): ReactElement {
  const { t } = useTranslation();
  const referrals = useSelector((state) => state.userReferrals.userReferralList);
  const previewList = referrals.slice(0, 3);
  const router = useRouter();

  const onClick = () => {
    router.push("/profile/referrals");
  };

  return (
    <>
      <label>Referrals: {JSON.stringify(referrals)}</label>

      <div className={`relative flex items-center ${referrals && referrals ? "" : "hidden"}`}></div>
      <div className="relative text-sm font-normal text-gray-500 cursor-pointer md:flex md:font-medium" onClick={onClick}>
        <span className="md:inline-block">{referrals?.length} Friends have used your invite code</span>
      </div>
    </>
  );
}
