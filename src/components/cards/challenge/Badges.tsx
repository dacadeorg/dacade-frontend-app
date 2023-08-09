import Tag from "@/components/ui/Tag";
import { Challenge } from "@/types/course";
import { useTranslation } from "react-i18next";

/**
 * this component is for the badges indicating if the course has a team challenge and the course level
 * @date 8/9/2023 - 6:06:39 PM
 *
 * @export
 * @param {{ challenge: Challenge; className?: string }} { challenge, className }
 * @returns {*}
 */
export default function Badges({ challenge, className }: { challenge: Challenge; className?: string }) {
  const { t } = useTranslation();
  return (
    <div className={`uppercase flex gap-2 mb-6 ${className}`}>
      {challenge?.level && <Tag>{t(`course.challenge.level-${challenge.level}`)}</Tag>}
      {challenge?.isTeamChallenge && <Tag type="light">Team Challenge</Tag>}
    </div>
  );
}
