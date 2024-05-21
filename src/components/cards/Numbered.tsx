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
export default function Numbered({ index = 1, title = "", text = "" }: NumberedProps): ReactElement {
  return (
    <div className="flex items-center md:flex-col md:items-start gap-2.5">
      <div className="block">
        <div className="w-9 h-9 md:w-14 md:h-14 border border-solid border-gray-400 text-gray-400 font-medium rounded-full flex items-center justify-center">{index}</div>
      </div>
      <div>
        <span className="font-medium">{title}</span> <span>{text}</span>
      </div>
    </div>
  );
}
