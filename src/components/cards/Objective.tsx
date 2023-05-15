import { ReactElement } from "react";
import Checkmark from "@/icons/checkmark.svg";
import Crossmark from "@/icons/crossmark.svg";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Objective card component props
 * @date 3/29/2023 - 8:13:16 PM
 *
 * @interface ObjectiveCardProps
 * @typedef {ObjectiveCardProps}
 */

interface ObjectiveCardProps {
  iconcolor?: string;
  crossmark?: boolean;
  objective?: string;
}

/**
 * Objective card component
 * @date 3/29/2023 - 8:12:55 PM
 *
 * @export
 * @param {ObjectiveCardProps} {
  iconcolor = "",
  crossmark = false,
  objective,
}
 * @returns {ReactElement}
 */

export default function ObjectiveCard({ iconcolor = "", crossmark = false, objective }: ObjectiveCardProps): ReactElement {
  const colors = useSelector((state) => state.ui.colors);

  return (
    <div className="flex">
      <div className="py-0 pt-px mt-px mr-2" style={{ color: iconcolor || colors.primary }}>
        {crossmark ? <Crossmark /> : <Checkmark />}
      </div>
      <div className="text-sm font-normal leading-5 contains-ordered-list" dangerouslySetInnerHTML={{ __html: objective as string }} />
    </div>
  );
}
