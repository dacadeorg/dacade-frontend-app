import Tag from "@/components/ui/Tag";
import { Challenge } from "@/types/course";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";

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
  testId?: string;
}
export default function Badges({ challenge, className, courseLevel, testId = "badge" }: BadgeProps) {
  const { t } = useTranslation();

  const level = useMemo(() => {
    const value = challenge?.level || courseLevel;
    return value === 0 || value === 1 ? "course.challenge.level-0" : "course.challenge.level-2";
  }, [challenge?.level, courseLevel]);

  if (!level && !challenge?.isTeamChallenge) return <></>;
  return (
    <div data-testId={testId} className={`uppercase flex flex-wrap gap-2 mb-3 ${className}`}>
      {level && <Tag>{t(level)}</Tag>}
      {challenge?.isTeamChallenge && <Tag type="light">{challenge?.isHackathon ? "Hackathon" : "Team"} challenge</Tag>}
    </div>
  );
}
