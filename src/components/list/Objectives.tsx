import Objective from "@/components/cards/Objective";
import { ReactElement } from "react";

interface ObjectiveProps {
  iconcolor?: string;
  crossmark?: boolean;
  objectives?: string[];
  feedback?: string[];
}

/**
 * Objective list component 
 * @date 4/3/2023 - 12:07:41 PM
 *
 * @export
 * @param {ObjectiveProps} {
  iconcolor = "",
  crossmark = false,
  objectives = [],
  feedback = [],
}
 * @returns {ReactElement}
 */
export default function ObjectiveList({ iconcolor = "", crossmark = false, objectives = [] }: ObjectiveProps): ReactElement {
  return (
    <div className="flex flex-col gap-y-3 md:grid md:w-fit md:gap-x-3 md:items-stretch pt-6 md:pb-2 md:mb-2">
      {objectives.map((objective, index) => (
        <Objective key={`objective-list-${index}`} crossmark={crossmark} objective={objective} iconcolor={iconcolor} />
      ))}
    </div>
  );
}
