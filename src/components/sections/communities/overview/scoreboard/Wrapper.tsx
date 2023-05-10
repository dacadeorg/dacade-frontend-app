import { ReactNode, ReactElement } from "react";

/**
 * Communities section wrapper props interface
 * @date 4/12/2023 - 8:28:45 PM
 *
 * @interface SectionWrapperProps
 * @typedef {SectionWrapperProps}
 */

interface SectionWrapperProps {
  title?: string;
  description?: string;
  children?: ReactNode;
}

/**
 * Communities pages section wrapper
 * @date 4/12/2023 - 8:28:14 PM
 *
 * @export
 * @param {SectionWrapperProps} {
  title = "",
  description = "",
  children,
}
 * @returns {ReactElement}
 */

export default function SectionWrapper({ title = "", description = "", children }: SectionWrapperProps): ReactElement {
  return (
    <div className="py-12 flex flex-col">
      <div className="w-full lg:w-3/12 xl:w-2/5 flex flex-col text-gray-700 space-y-2">
        <div className="font-medium text-.5xl leading-snug">{title}</div>
        <div className="text-sm font-light w-3/4 xl:w-3/4 lg:w-full lg:pr-7">{description}</div>
      </div>
      <div className="w-full mt-5 items-center md:flex md:flex-col">{children}</div>
    </div>
  );
}
