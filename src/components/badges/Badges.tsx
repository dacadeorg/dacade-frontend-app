import Tag from "@/components/ui/Tag";
import { Challenge } from "@/types/course";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

/**
 * this component is for the badges indicating if the course has a team challenge and the course level
 * @date 8/9/2023 - 6:06:39 PM
 *
 * @export
 * @param  {{ challenge: Challenge, className:string }}
 * @interface BadgeProps
 * @returns {*}
 */
interface BadgeProps {
  challenge?: Challenge;
  className?: string;
  courseLevel?: number;
}
export default function Badges({ challenge, className, courseLevel }: BadgeProps) {
  const { t } = useTranslation();
  const [challengeLevel, setChallengeLevel] = useState("");

  const level = challenge?.level || courseLevel;

  useEffect(() => {
    if (level === 0 || level === 1) return setChallengeLevel("course.challenge.level-0");
    return setChallengeLevel("course.challenge.level-2");
  }, [level]);

  if (!level && !challenge?.isTeamChallenge) return <></>;

  return (
    <div className={`uppercase flex flex-wrap gap-2 mb-3 ${className}`}>
      {level && <Tag>{t(challengeLevel)}</Tag>}
      {challenge?.isTeamChallenge && <Tag type="light">{challenge?.isHackathon ? "Hackathon" : "Team"} challenge</Tag>}
    </div>
  );
}
