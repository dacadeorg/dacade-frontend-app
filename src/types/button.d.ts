import { CSSProperties, MouseEvent, ReactNode, HTMLButtonElement } from "react";

export type ButtonProps = {
    text?: number | string;
    loading?: boolean;
    disabled?: boolean;
    rounded?: boolean;
    type?: "submit" | "button" | "reset" | undefined;
    variant?: string;
    padding?: boolean | string;
    margin?: string;
    customStyle?: CSSProperties | null;
    link?: string;
    target?: string;
    className?: string;
    communityStyles?: boolean;
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  }