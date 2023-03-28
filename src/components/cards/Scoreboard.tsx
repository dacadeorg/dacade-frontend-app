// import { useSelector } from 'react-redux';
import Avatar from '@/components/ui/Avatar';
import Badge from '@/components/ui/Badge';
import Currency from '@/components/ui/Currency';
// waiting for the store folder to be migrated.....
// import { RootState } from '@/store/types';


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
};


/**
 * Component for the scoreboard card
 * @date 3/28/2023 - 11:01:01 AM
 *
 * @export
 * @param {ScoreboardProps} { value, index = 0 }
 * @returns {*}
 */
export default function ScoreboardCard ({ value, index = 0 }: ScoreboardProps)  {
// commented these lines as we do not have the RootState migrated yet. will be uncommented after.

//   const { colors, community } = useSelector((state: RootState) => ({
//     colors: state.ui.colors,
//     community: state.communities.current,
//   }));

  const t = (key: string) => key; // replace this with your own translation function

  return (
    <div className="relative w-full flex sm:space-x-5 space-y-0 sm:flex-row-reverse sm:space-x-reverse sm:justify-between overflow-hidden bg-gray-50 sm:p-7 py-5 px-6 sm:items-center">
      <div className="sm:flex-none absolute bottom-5 left-6 sm:relative sm:inset-0">
        <div className="font-medium text-gray-500 px-2.5 py-0.5 h-6 text-xxs bg-gray-200 rounded-full">
          <Currency value={value.score} token="REP" />
        </div>
      </div>
      <div className="flex-1">
        <div className="text-lg font-medium">{value.user.displayName}</div>
        <div className="flex flex-row divide-x divide-solid divide-gray-300">
          <div className="whitespace-nowrap text-base pr-4">
            <span className="font-normal text-xs">
              {value.feedbacks}
              <span className="font-normal text-xs">
                {t(value.feedbacks === 1 ? 'Submission' : 'Submissions')}
              </span>
            </span>
          </div>
          <div className="whitespace-nowrap text-base px-4">
            <span className="font-normal text-xs">
              {value.score}
              <span className="font-normal text-xs">
                {t(value.score === 1 ? 'Total Point' : 'Total Points')}
              </span>
            </span>
          </div>
          <div className="whitespace-nowrap text-base px-4">
            <span className="font-normal text-xs">
              {value.feedbacks}
              <span className="font-normal text-xs">
                {t(value.feedbacks === 1 ? 'Feedback' : 'Feedbacks')}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="relative sm:flex-none pt-9 sm:p-0">
        <div className="relative sm:inset-0">
          <Avatar user={value.user} size="large" />
          <Badge
            className="absolute left-9 top-10 w-6 h-6 bg-theme-accent text-white"
            value={index}
            customStyle={{
              bottom: '-1px',
              right: '-3px',
              color: '#fff',
            //   backgroundColor: colors.textAccent,
            }}
          />
        </div>
      </div>
    </div>
  );
};
