import React, { CSSProperties, ReactElement } from "react";

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

export default function ThemeWrapper({
  colors,
  children,
}: ThemeWrapperProps) {
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
