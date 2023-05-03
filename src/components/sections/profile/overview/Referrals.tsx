import { useEffect, ReactElement } from "react";
import ReferralsList from "@/components/list/ReferralsList";
import Request from "@/components/cards/profile/Request";
import ProfileOverviewSection from "@/components/sections/profile/overview/Section";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchReferrals } from "@/store/services/referrals.service";
import { useRouter } from "next/router";

/**
 * Referrals component from the profile
 * @date 5/3/2023 - 11:34:04 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function ProfileOverviewReferrals(): ReactElement {
  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(fetchReferrals(router.locale as string));
  }, [dispatch, router.locale]);

  return (
    <ProfileOverviewSection title="Referrals">
      <div className="flex space-x-4">
        <ReferralsList text="Invite your friends to Dacade and earn referral bounties" />
      </div>
      <div className="pt-8">
        <Request />
      </div>
    </ProfileOverviewSection>
  );
}
