import classNames from "classnames";
import { HTMLProps, ReactElement } from "react";

/**
 * Tag Props Interface
 * @date 3/23/2023 - 6:28:57 PM
 *
 * @interface TagProps
 * @typedef {TagProps}
 */
interface TagProps extends HTMLProps<HTMLDivElement> {
  rounded?: boolean;
  type?: "transparent" | "gray" | "light-gray" | "warn" | "light";
  value?: string;
  children?: React.ReactNode;
  className?: string;
  testId?: string;
  tagValueTestId?: string;
}

/**
 * Tag Component
 * @date 3/23/2023 - 6:29:20 PM
 *
 * @export
 * @param {TagProps} {
  rounded = true,
  type = "gray",
  value,
  children,
}
 * @returns {ReactElement}
 */
export default function Tag({ rounded = true, type = "gray", value, children, testId = "tag", tagValueTestId = "tag-value", className, ...props }: TagProps): ReactElement {
  const tagClassNames = classNames(
    "text-center px-2 p-0.5 h-5 inline-flex items-center", className,
    {
      "bg-transparent bg-opacity-25 text-white": type == "transparent",
    },
    { "bg-gray-200 text-gray-500": type == "gray" },
    { "bg-gray-100 text-gray-500": type == "light-gray" },
    { "bg-white border-gray-500 border": type == "light" },
    { "bg-yellow-100 text-yellow-900": type == "warn" },
    { "rounded-full": rounded },
    { rounded: !rounded }
  );
  return (
    <div {...props} className={tagClassNames} data-testid={testId}>
      <span className="text-xs font-medium block leading-3.3">{value ? <span data-testid={tagValueTestId}>{value}</span> : children}</span>
    </div>
  );
}
