import { useSelector } from "@/hooks/useTypedSelector";
import DateManager from "@/utilities/DateManager";
import { ReactElement } from "react";

/**
 * Props for duration
 * @date 4/17/2023 - 11:14:17 AM
 *
 * @interface DurationProps
 * @typedef {DurationProps}
 */
interface DurationProps {
  text: string;
  value: number;
}

/**
 * Function to return the duration partial component
 * @date 4/17/2023 - 11:14:35 AM
 *
 * @export
 * @param {DurationProps} {
  text,
  value,
}
 * @returns {ReactElement}
 */
export default function Duration({ text, value }: DurationProps): ReactElement {
  const colors = useSelector((state) => state.ui.colors);
  const duration = value ? DateManager.humanize(value, "en") : 0;

  return (
    <div>
      {duration && (
        <span className="text-sm text-gray-500">
          <span style={{ color: colors?.textAccent }}>{duration}</span> {text}
        </span>
      )}
    </div>
  );
}
