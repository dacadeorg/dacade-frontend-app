import { ReactNode, ReactElement } from "react";

/**
 * Section wrapper component props interface
 * @date 4/12/2023 - 5:43:32 PM
 *
 * @interface SectionWrapperProps
 * @typedef {SectionWrapperProps}
 */

interface SectionWrapperProps {
  title?: string | null;
  description?: string;
  children?: ReactNode;
}

/**
 * Community section wrapper component
 * @date 4/12/2023 - 5:42:53 PM
 *
 * @export
 * @param {SectionWrapperProps} {
  title,
  description,
  children,
}
 * @returns {ReactElement}
 */

export function SectionWrapper({
  title,
  description,
  children,
}: SectionWrapperProps): ReactElement {
  return (
    <div className="py-12 flex flex-col lg:flex-row">
      <div className="w-full lg:w-3/12 xl:w-2/5 flex flex-col text-gray-700 space-y-2">
        <div className="font-medium text-.5xl leading-snug">
          {title}
        </div>
        <div className="text-sm font-light w-3/4 xl:w-3/4 lg:w-full lg:pr-7">
          {description}
        </div>
      </div>
      <div className="w-full mt-5 lg:m-0 lg:w-9/12 xl:w-3/5 items-center flex flex-col">
        {children}
      </div>
    </div>
  );
}
