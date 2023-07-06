import React from 'react';
import { useSelector } from "@/hooks/useTypedSelector";
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Currency from '@/components/ui/Currency';

interface ScoreboardCardProps {
  value: {
    user: {
      displayName: string;
    };
    feedbacks: number;
    score: number;
  };
  index: number;
}

const ScoreboardCard: React.FC<ScoreboardCardProps> = ({ value, index }) => {
  const colors = useSelector((state) => state.ui.colors);
  const community = useSelector((state) => state.communities.current);

  return (
    <div className="relative w-full md:flex sm:space-x-5 space-y-0 sm:flex-row-reverse sm:space-x-reverse sm:justify-between overflow-hidden sm:p-7 py-5 px-6 sm:items-center">
      <div className="md:flex-none absolute bottom-5 left-6 md:relative md:inset-0">
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
              <span className="font-normal text-xs">
                {value.feedbacks === 1 ? 'Submission' : 'Submissions'}
              </span>
            </span>
          </div>
          <div className="whitespace-nowrap text-base sm:px-4 px-3">
            <span className="font-normal text-xs">
              {value.score}
              <span className="font-normal text-xs">
                {value.score === 1 ? 'Total Point' : 'Total Points'}
              </span>
            </span>
          </div>
          <div className="whitespace-nowrap text-base sm:px-4 px-3">
            <span className="font-normal text-xs">
              {value.feedbacks}
              <span className="font-normal text-xs">
                {value.feedbacks === 1 ? 'Feedback' : 'Feedbacks'}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="relative float-right md:float-left sm:flex-none pt-1 sm:p-0">
        <div className="relative sm:inset-0">
          <Avatar user={value.user} size="large" hide-verification-badge />
          <Badge
            className="absolute left-9 top-10 w-6 h-6 bg-theme-accent text-white"
            value={index}
            customStyle={{
              bottom: '-1px',
              right: '-3px',
              color: '#fff',
              backgroundColor: colors.textAccent,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ScoreboardCard;