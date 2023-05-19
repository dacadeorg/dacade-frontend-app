import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Currency from "@/components/ui/Currency";
import { ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Interface for the scoreboard properties
 * @date 3/28/2023 - 11:00:23 AM
 *
 * @interface ScoreboardProps
 * @typedef {ScoreboardProps}
 */
interface ScoreboardProps {
  value: {
    user: {
      displayName: string;
    };
    score: number;
    feedbacks: number;
  };
  index?: number;
}

/**
 * Component for the scoreboard card
 * @date 3/28/2023 - 11:01:01 AM
 *
 * @export
 * @param {ScoreboardProps} { value, index = 0 }
 * @returns {*}
 */
export default function ScoreboardCard({ value, index = 0 }: ScoreboardProps): ReactElement {
  const { colors } = useSelector((state) => ({
    colors: state.ui.colors,
    community: state.communities.current,
  }));

  const { t } = useTranslation();

  return (
    <div className="relative w-full md:flex sm:space-x-5 space-y-0 sm:flex-row-reverse sm:space-x-reverse sm:justify-between overflow-hidden bg-gray-50 sm:p-7 py-5 px-6 sm:items-center">
      <div className="sm:flex-none absolute bottom-5 left-6 md:relative md:inset-0">
        <div className="font-medium text-gray-500 px-2.5 py-0.5 h-6 text-xxs bg-gray-200 rounded-full">
          <Currency value={value.score} token="REP" />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-lg font-medium">{value.user.displayName}</div>
        <div className="flex flex-row divide-x divide-solid divide-gray-300">
          <div className="whitespace-nowrap text-base sm:pr-4 pr-3">
            <span className="font-normal text-xs">
              {value.feedbacks}
              <span className="font-normal text-xs">{t(value.feedbacks === 1 ? "Submission" : "Submissions")}</span>
            </span>
          </div>
          <div className="whitespace-nowrap text-base sm:px-4 px-3">
            <span className="font-normal text-xs">
              {value.score}
              <span className="font-normal text-xs">{t(value.score === 1 ? "Total Point" : "Total Points")}</span>
            </span>
          </div>
          <div className="whitespace-nowrap text-base px-4">
            <span className="font-normal text-xs">
              {value.feedbacks}
              <span className="font-normal text-xs">{t(value.feedbacks === 1 ? "Feedback" : "Feedbacks")}</span>
            </span>
          </div>
        </div>
      </div>
      <div className="relative float-right md:float-left sm:flex-none pt-1 sm:p-0">
        <div className="relative sm:inset-0">
          <Avatar user={value?.user} size="large" shape="full" hideVerificationBadge />
          <Badge
            className="absolute left-9 top-10 w-6 h-6 bg-theme-accent text-white"
            value={index}
            customStyle={{
              bottom: "-1px",
              right: "-3px",
              color: "#fff",
              backgroundColor: colors.textAccent,
            }}
          />
        </div>
      </div>
    </div>
  );
}
