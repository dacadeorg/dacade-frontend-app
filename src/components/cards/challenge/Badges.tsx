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
  challenge: Challenge;
  className?: string;
}
export default function Badges({ challenge, className }: BadgeProps) {
  const { t } = useTranslation();
  const [challengeLevel, setChallengeLevel] = useState("");

  useEffect(() => {
    if (challenge.level === 0 || challenge.level === 1) return setChallengeLevel("course.challenge.level-0");
    return setChallengeLevel("course.challenge.level-2");
  }, [challenge.level]);

  return (
    <div className={`uppercase flex gap-2 mb-6 ${className}`}>
      {challenge?.level && <Tag>{t(challengeLevel)}</Tag>}
      {challenge?.isTeamChallenge && <Tag type="light">Team Challenge</Tag>}
    </div>
  );
}
