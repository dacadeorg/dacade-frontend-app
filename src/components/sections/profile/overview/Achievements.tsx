import ProfileOverviewSection from "@/components/sections/profile/overview/Section";
import AchievementCard from "@/components/cards/Achievement";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react";

/**
 * profile- Achievents component
 * @date 5/3/2023 - 11:54:40 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function ProfileOverviewAchievements(): ReactElement {
  //     TODO: To uncomment when profile slice is migrated
  //   const achievements = useSelector(
  //     (state) => state.profile.certificates.list
  //   );

  return (
    <ProfileOverviewSection title="Achievements">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {/* TODO: To uncomment when profile slice is migrated
        {achievements.map((achievement, index) => (
          <AchievementCard
            key={index}
            data={achievement}
          />
        ))} */}
      </div>
    </ProfileOverviewSection>
  );
}
