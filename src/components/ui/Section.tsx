import { ReactElement, ReactNode } from "react";
import classNames from "classnames";

/**
 * Section component props
 * @date 3/23/2023 - 8:35:39 PM
 *
 * @interface Props
 * @typedef {Props}
 */
interface SectionProps {
  type?: string;
  padding?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Section component
 * @date 3/23/2023 - 8:35:24 PM
 *
 * @export
 * @param {Props} {
  type = "default",
  padding = "py-4",
  children,
}
 * @returns {ReactElement}
 */
export default function Section({ type, padding = "py-4", children, className = "" }: SectionProps): ReactElement {
  const sectionClassName = classNames("relative", className, {
    "bg-white text-gray-900": type === "default",
    "bg-primary text-white": type === "primary",
    "bg-secondary text-gray-900": type === "secondary",
    "bg-gray-50 text-gray-900": type === "secondary-light",
  });

  return (
    <div className={sectionClassName}>
      <div className={`content-wrapper ${padding}`}>{children}</div>
    </div>
  );
}
