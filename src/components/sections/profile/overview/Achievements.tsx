import React, { ReactElement, useState } from "react";
import ProfileOverviewSection from "@/components/sections/profile/overview/Section";
import AchievementCard from "@/components/cards/Achievement";
import { useSelector } from "@/hooks/useTypedSelector";
import Plus from "@/icons/plus.svg";
import Less from "@/icons/less.svg";

/**
 * profile- Achievents component
 * @date 5/3/2023 - 11:54:40 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function ProfileOverviewAchievements(): ReactElement {
  const achievements = useSelector((state) => state.profileCertificate.list);
  const [showAll, setShowAll] = useState(false);

  if (achievements && achievements.length) {
    const displayedAchievements = showAll ? achievements : achievements.slice(0, 4);

    return (
      <ProfileOverviewSection title="Achievements">
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 xl:grid-cols-4">
          {displayedAchievements.map((achievement, index) => (
            <AchievementCard key={`profile-achievement-${index}`} data={achievement} />
          ))}
        </div>
        {showAll ? (
          <button  onClick={() => setShowAll(false)} className="text-primary bg-transparent pt-4 flex items-center gap-1.5 cursor-pointer">
            {" "}
            <Less />
            <span>See Less</span>
          </button>
        ) : (
          <button  onClick={() => setShowAll(true)} className="text-primary bg-transparent pt-4 flex items-center gap-1.5 cursor-pointer">
            {" "}
            <Plus />
            <span>See All</span>
          </button>
        )}
      </ProfileOverviewSection>
    );
  }
  return <></>;
}
