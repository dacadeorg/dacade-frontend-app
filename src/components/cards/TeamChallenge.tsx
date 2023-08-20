import { ReactElement } from "react";

/**
 *  TeamChallengeCard component props
 * @date 3/30/2023 - 9:18:44 AM
 *
 * @interface TeamChallengeCardProps
 * @typedef {TeamChallengeCardProps}
 */
interface TeamChallengeCardProps {
  index?: number | string;
  title?: string;
  text?: string;
}

/**
 *  TeamChallengeCard component
 * @date 3/29/2023 - 5:13:03 PM
 *
 * @export
 * @param {{ index?: number; title?: string; text?: string; }} {
  index = 1,
  title = "",
  text = "",
}
 * @returns {ReactElement}
 */
export default function TeamChallengeCard({ index = 1, title = "", text = "" }: TeamChallengeCardProps): ReactElement {
  return (
    <div className="md:w-1/3">
      <div className="hidden xl:block md:block">
        <div className="w-14 h-14 border border-solid border-gray-400 text-gray-500 font-medium rounded-full flex items-center justify-center">{index}</div>
      </div>
      <div className="mt-2.5 text-base font-normal">
        <p className="font-medium">{title}</p>
        <p className="">{text}</p>
      </div>
    </div>
  );
}
