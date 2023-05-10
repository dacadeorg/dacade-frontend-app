import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react";
import ProfileOverviewSection from "./Section";
import CommunityCardSmall from "@/components/cards/community/Small";
import { useRouter } from "next/router";

/**
 * Profile communites component
 * @date 5/3/2023 - 11:31:05 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function ProfileOverviewCommunities(): ReactElement {
  const { reputations, authUser } = useSelector((state) => ({
    reputations: state.profile.reputations.list,
    authUser: state.user.data,
  }));
  const router = useRouter();
  const username = router.asPath || authUser?.displayName;

  return (
    <ProfileOverviewSection title="Communities">
      {reputations && reputations.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {reputations.map((reputation, i) => (
            <div key={`reputation-${i}`} className="block">
              <CommunityCardSmall data={reputation} />
            </div>
          ))}
        </div>
      )}
    </ProfileOverviewSection>
  );
}
