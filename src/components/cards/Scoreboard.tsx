import { useSelector } from "@/hooks/useTypedSelector";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Currency from "@/components/ui/Currency";

/**
 * Props for the ScoreboardCard component.
 */
interface ScoreboardCardProps {
  value: {
    user: {
      displayName: string;
    };
    feedbacks: number;
    score: number;
    submissions: number;
  };
  index: number;
}

/**
 * ScoreboardCard component.
 *
 * @param {ScoreboardCardProps} props - The component props.
 * @returns {JSX.Element} The rendered component.
 */
export default function ScoreboardCard({ value, index }: ScoreboardCardProps): JSX.Element {
  const colors = useSelector((state) => state.ui.colors);

  return (
    <div className="relative w-full md:flex sm:space-x-5 space-y-0 sm:flex-row-reverse sm:space-x-reverse sm:justify-between overflow-hidden sm:p-7 py-5 px-6 sm:items-center">
      <div className="md:flex-none absolute bottom-5 left-6 md:relative md:inset-0">
        <div className="font-medium text-gray-500 px-2.5 py-0.5 h-6 text-xxs bg-gray-200 rounded-full">
          <Currency value={value.score} token="REP" />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-lg font-medium">{value.user.displayName}</div>
        <div className="flex items-center divide-x divide-solid divide-gray-300 mt-1">
          <p className="whitespace-nowrap sm:pr-4 pr-3 text-xs space-x-1">
            <span>{value.submissions}</span>
            <span>{value.submissions === 1 ? "Submission" : "Submissions"}</span>
          </p>
          <p className="whitespace-nowrap sm:px-4 px-3 text-xs space-x-1">
            <span>{value.score}</span>
            <span>{value.score === 1 ? "Total Point" : "Total Points"}</span>
          </p>
          <p className="whitespace-nowrap text-xs sm:px-4 px-3 space-x-1">
            <span>{value.feedbacks}</span>
            <span>{value.feedbacks === 1 ? "Feedback" : "Feedbacks"}</span>
          </p>
        </div>
      </div>

      <div className="relative float-right md:float-left sm:flex-none pt-1 sm:p-0">
        <div className="relative sm:inset-0">
          <Avatar user={value.user} size="large" hideVerificationBadge />
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
