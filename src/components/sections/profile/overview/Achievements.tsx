import ProfileOverviewSection from "@/components/sections/profile/overview/Section";
import AchievementCard from "@/components/cards/Achievement";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react";
import Plus from "@/icons/plus.svg";
import Link from "next/link";

/**
 * profile- Achievents component
 * @date 5/3/2023 - 11:54:40 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function ProfileOverviewAchievements(): ReactElement {
  const achievements = useSelector((state) => state.profileCertificate.list);

  if (achievements && achievements.length)
    return (
      <ProfileOverviewSection title="Achievements">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {achievements.map((achievement, index) => (
            <AchievementCard key={`profile-achievement-${index}`} data={achievement} />
          ))}
        </div>
        <Link href={`/achievements/`} className="text-primary pt-4 flex items-center gap-4 cursor-pointer">
        {" "}
        <Plus />
        <span>See all</span>
        
      </Link>
      </ProfileOverviewSection>
    );
  return <></>;
}
