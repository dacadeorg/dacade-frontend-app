import React, { ReactElement } from "react";

/**
 * This is an interface for Header component props
 * @date 4/16/2023 - 5:23:23 PM
 *
 * @interface HeaderProps
 * @typedef {HeaderProps}
 */
interface HeaderProps {
  hideTitleOnMobile?: boolean;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
}

/**
 *  Header component
 * @date 4/16/2023 - 5:23:32 PM
 *
 * @export
 * @param {HeaderProps} {
  hideTitleOnMobile = false,
  title = null,
  subtitle = null,
  description = null,
}
 * @returns {ReactElement}
 */
export default function Header({
  hideTitleOnMobile = false,
  title = null,
  subtitle = null,
  description = null,
}: HeaderProps): ReactElement {
  return (
    <div>
      <h1
        className={`text-4xl md:text-5xl leading-none ${
          hideTitleOnMobile ? "hidden md:flex" : ""
        } ${subtitle ? "text-gray-400" : "text-gray-900"}`}
      >
        {title}
      </h1>
      {subtitle && (
        <h2 className="text-4xl md:text-5xl leading-none text-default font-normal">
          {subtitle}
        </h2>
      )}
      {description && (
        <p className="lg:w-99 my-2 md:my-5 text-base md:text-.5xl w-full md:w-10/12 leading-loose md:leading-snug text-gray-700">
          {description}
        </p>
      )}
    </div>
  );
}
