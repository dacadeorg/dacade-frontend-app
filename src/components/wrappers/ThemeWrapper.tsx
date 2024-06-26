import { CSSProperties, ReactElement, ReactNode, useMemo } from "react";
import { Colors } from "@/types/community";

/**
 * Theme wrapper property interface
 * @date 3/27/2023 - 6:39:31 PM
 *
 * @interface ThemeWrapperProps
 * @typedef {ThemeWrapperProps}
 */
interface ThemeWrapperProps {
  colors?: Colors;
  className?: string;
  children: ReactNode;
}

/**
 * Interface for the css style properties
 * @date 3/27/2023 - 6:40:04 PM
 *
 * @interface CSSVars
 * @typedef {CSSVars}
 * @extends {CSSProperties}
 */
interface CSSVars extends CSSProperties {
  "--tm-primary"?: string;
  "--tm-secondary"?: string;
  "--tm-text"?: string;
  "--tm-highlight"?: string;
  "--tm-accent"?: string;
  "--tm-muted"?: string;
}

/**
 * Theme wrapper components
 * @date 3/27/2023 - 6:40:41 PM
 *
 * @export
 * @param {ThemeWrapperProps} { colors = {}, children }
 * @returns {ReactElement}
 */
export default function ThemeWrapper({ colors, className = "", children }: ThemeWrapperProps): ReactElement {
  const cssVars: CSSVars = useMemo(() => {
    return {
      "--tm-primary": colors?.cover?.background || colors?.primary,
      "--tm-secondary": colors?.secondary,
      "--tm-text": colors?.cover?.text || colors?.text,
      "--tm-highlight": colors?.highlight,
      "--tm-accent": colors?.accent,
      "--tm-muted": colors?.muted,
    };
  }, [colors]);

  return (
    <div className={className} style={{ ...cssVars }} data-testid="themeWrapper">
      {children}
    </div>
  );
}
