import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { User } from "@/types/bounty";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";

/**
 * Scoreboard list props interface
 * @date 3/30/2023 - 10:30:58 AM
 *
 * @interface ScoreboardListProps
 * @typedef {ScoreboardListProps}
 */
interface ScoreboardListProps {
  badgeStyles?: Record<string, string>;
  users?: User[];
}

/**
 * Scoreboard list component
 * @date 3/30/2023 - 10:31:19 AM
 *
 * @export
 * @param {ScoreboardListProps} {
  badgeStyles = { backgroundColor: "purple" },
  users = [],
}
 * @returns {ReactElement}
 */

export default function ScoreboardList({ badgeStyles = { backgroundColor: "purple" }, users = [] }: ScoreboardListProps): ReactElement {
  const { t } = useTranslation();

  return (
    <div className="pb-5 w-full divide-y divide-gray-200 space-y-4 bg-secondary rounded-3xl lg:max-w-2xl">
      {users.map((user, i) => (
        <div key={`score-user-${i}`} className="px-3">
          <div className="h-36 md:h-24 md:flex w-full justify-between md:justify-end space-x-5 space-y-0 pt-6 md:flex-row-reverse md:pt-6">
            <div className="relative flex flex-row-reverse md:w-full md:justify-items-stretch md:relative md:text-right md:right-0">
              <div className="absolute md:relative md:top-0 -bottom-28 md:-bottom-24 font-medium text-gray-500 left-5 md:left-auto md:right-5 px-2 py-1 h-6 text-xs bg-gray-200 rounded-full">
                {user.reputation}
              </div>
            </div>
            <div className="w-full md:w-auto">
              <div className="text-lg font-medium">{user.displayName}</div>
              <div className="whitespace-nowrap text-base">
                <span className="font-medium">
                  <>{user?.feedbacks}</>
                  <span className="font-normal">{t("feedbacks")}</span>
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute md:relative right-2 md:-bottom-10 -bottom-14 md:top-0">
                <Avatar user={user} size="large" />
                <Badge className="absolute left-9 top-10 w-6 h-6" value="1" customStyle={badgeStyles} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
