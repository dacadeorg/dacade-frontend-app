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
  const achievements = useSelector((state) => state.profile.certificate.list);

  return (
    <ProfileOverviewSection title="Achievements">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
        {achievements.map((achievement, i) => (
          <AchievementCard key={`profile-achievement-${i}`} data={achievement} />
        ))}
      </div>
    </ProfileOverviewSection>
  );
}
