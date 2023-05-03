import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react";
import ProfileOverviewSection from "./Section";
import CommunityCardSmall from "@/components/cards/community/Small";

/**
 * Profile communites component
 * @date 5/3/2023 - 11:31:05 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function ProfileOverviewCommunities(): ReactElement {
  const reputations = useSelector((state) => state.reputations.list);

  const authUser = useSelector((state) => state.user.data);
  const username =
    window.location.pathname.split("/")[1] || authUser?.displayName;

  return (
    <ProfileOverviewSection title="Communities">
      {reputations && reputations.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {reputations.map((reputation, i) => (
            <div key={`reputation-${i}`} className="block">
              <CommunityCardSmall data={reputation} />
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </ProfileOverviewSection>
  );
}
