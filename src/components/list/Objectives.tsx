// TODO: will be uncommented when we apply the redux
// import { useSelector } from 'react-redux';
import Objective from "@/components/cards/Objective";
import { ReactElement } from "react";

// TODO: Will be updated when there is the acctual types
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
export default function ObjectiveList({
  iconcolor = "",
  crossmark = false,
  objectives = [],
  feedback = [],
}: ObjectiveProps): ReactElement {
  // TODO: will be uncommented when we apply the redux
  //   const community = useSelector((state) => state.communities.current);
  //   const colors = useSelector((state) => state.ui.colors);

  return (
    <div className="flex flex-col gap-y-3 md:grid md:w-99 md:gap-x-3 md:items-stretch pt-2 md:pt-5 md:pb-2 md:mb-2">
      {objectives.map((objective, index) => (
        <Objective
          key={`objective-list-${index}`}
          crossmark={crossmark}
          objective={objective}
          iconcolor={iconcolor}
        />
      ))}
    </div>
  );
}
