import React, { CSSProperties, ReactElement } from "react";

/**
 * Interface for ThemeWrapper component props
 * @date 3/27/2023 - 8:44:13 PM
 *
 * @interface ThemeWrapperProps
 * @typedef {ThemeWrapperProps}
 */
interface ThemeWrapperProps {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    highlight: string;
    accent: string;
    muted: string;
  };
  children: ReactElement;
}

/**
 * This ThemeWrapper component
 * @date 3/27/2023 - 8:44:19 PM
 *
 * @export
 * @param {ThemeWrapperProps} {
  colors,
  children,
}
 * @returns {ReactElement}
 */
export default function ThemeWrapper({
  colors,
  children,
}: ThemeWrapperProps): ReactElement {
  const cssVariable = {
    "--tm-primary": colors.primary,
    "--tm-secondary": colors.secondary,
    "--tm-text": colors.text,
    "--tm-highlight": colors.highlight,
    "--tm-accent": colors.accent,
    "--tm-muted": colors.muted,
  } as CSSProperties;

  return <div style={{ ...cssVariable }}>{children}</div>;
}
