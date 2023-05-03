import { ReactElement } from "react";

/**
 *  Numbered component props
 * @date 3/30/2023 - 9:18:44 AM
 *
 * @interface NumberedProps
 * @typedef {NumberedProps}
 */
interface NumberedProps {
  index?: number | string;
  title?: string;
  text?: string;
}

/**
 *  Numbered component
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
export default function Numbered({
  index = 1,
  title = "",
  text = "",
}: NumberedProps): ReactElement {
  return (
    <div>
      <div className="hidden xl:block md:block">
        <div className="w-14 h-14 border border-solid border-gray-400 text-gray-400 font-medium rounded-full flex items-center justify-center">
          {index}
        </div>
      </div>
      <div className="mt-2.5">
        <span className="font-medium">{title}</span>{" "}
        <span>{text}</span>
      </div>
    </div>
  );
}
