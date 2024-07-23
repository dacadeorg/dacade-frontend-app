import Checkbox from "@/components/ui/Checkbox";
import { ReactElement, useMemo } from "react";

/**
 * Interfacr for the interractive answer card
 * @date 4/18/2023 - 5:56:59 PM
 *
 * @interface InterractiveAswerProps
 * @typedef {InterractiveAswerProps}
 */
interface InterractiveAswerProps {
  checked?: boolean;
  correct?: boolean;
  selected?: boolean;
  text?: string;
  disable?: boolean;
  timerCount?: number;
  onRetry?: () => void;
  onWrong?: (index: number) => void;
  onChange?: () => void;
}

/**
 * Interactive module answer component
 * @date 4/19/2023 - 11:55:19 AM
 *
 * @export
 * @param {InterractiveAswerProps} {
  checked = false,
  correct = false,
  selected = false,
  text = "",
  disable = false,
  timerCount = 0,
}
 * @returns {ReactElement}
 */
export default function InteractiveModuleAnswer({ correct = false, selected = false, text = "", disable = false, onChange, timerCount = 0 }: InterractiveAswerProps): ReactElement {
  const borderColor = useMemo(() => (!selected ? "border-gray-200" : correct ? "border-green-200 divide-green-200" : "border-red-200 divide-red-200"), [correct, selected]);
  const bannerColor = !selected ? null : correct ? "bg-green-100 text-success" : "bg-red-100 text-red-900";
  const errorMessage = !timerCount ? "This answer is wrong. Try again!" : `This answer is wrong. Try again in ${timerCount} seconds`;

  return (
    <div
      className={`my-5 relative border-2 rounded select-none flex flex-col divide-y-2 divide-solid ${borderColor} ${disable ? "cursor-not-allowed" : "cursor-pointer"}`}
      role="button"
      onClick={() => onChange?.()}
    >
      <div className="flex items-center space-x-3 relative z-50 w-full md:p-4.5 p-4 border-solid bg-transparent checked-color">
        <span>
          <Checkbox
            checked={selected}
            disabled={disable}
            communityStyles={correct}
            className={!correct ? "text-red-900" : "!text-success"}
            onChange={() => {
              onChange?.();
            }}
          />
        </span>
        <span className="text-gray-500">{text}</span>
      </div>
      {selected && <div className={`w-full p-2.5 px-4 md:px-4.5 z-10 text-sm ${bannerColor}`}>{correct ? "Well done!" : errorMessage}</div>}
    </div>
  );
}
