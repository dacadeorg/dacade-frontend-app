import classNames from "classnames";
import Link from "next/link";
import {
  CSSProperties,
  MouseEvent,
  ReactNode,
  ReactElement,
} from "react";

// TODO: Should be uncommented when redux is implemented
// import { useSelector } from "react-redux";

/**
 * Button props interface
 * @date 3/23/2023 - 7:28:52 PM
 *
 * @interface ButtonProps
 * @typedef {ButtonProps}
 */

interface ButtonProps {
  text?: number | string;
  loading: boolean;
  disabled: boolean;
  rounded: boolean;
  type: "submit" | "button" | "reset" | undefined;
  variant: string;
  padding: boolean | string;
  margin?: string;
  customStyle?: object | null;
  link?: string;
  target: string;
  className?: string;
  communityStyles?: boolean;
  children: ReactNode
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * Component props type.
 * @date 3/23/2023 - 7:29:54 PM
 *
 * @typedef {ComponentProps}
 * @returns {ReactElement}
 */

type ComponentProps = Pick<
  ButtonProps,
  "link" | "disabled" | "padding" | "target" | "onClick" | "type"
> & {
  children: ReactNode;
  className: string;
  style: CSSProperties;
};

/**
 * Button Component
 * @date 3/23/2023 - 7:33:38 PM
 * 
 * @export
 * @param {ButtonProps} {
  text = "",
  loading = false,
  disabled = false,
  rounded = true,
  type = "primary",
  variant = "submit",
  padding = true,
  margin = "",
  customStyle = null,
  link = "",
  target = "_self",
  className = ""
  communityStyles = false,
}
 * @returns {ReactElement}
 */

export default function Button({
  text = "",
  disabled = false,
  rounded = true,
  variant = "primary",
  type = "submit",
  padding = true,
  customStyle = null,
  link = "",
  target = "_self",
  communityStyles = false,
  onClick,
  className = "",
  children
}: ButtonProps): ReactElement {
  // TODO: Should be uncommented when the redux is implemented
  //   const colors = useSelector((state: any) => state.ui.colors);

  const isInternalLink: boolean = link?.startsWith("/");

  const communityStylesObj = {};

  //TODO: Should be uncommented once redux is implemented
  //   if (communityStyles && colors && Object.keys(colors).length) {
  //     communityStylesObj = {
  //       borderColor: colors.textAccent,
  //       color: type.includes("outline")
  //         ? colors.textAccent
  //         : colors.text,
  //       backgroundColor: type.includes("outline")
  //         ? "transparent"
  //         : colors.textAccent,
  //       "--button-color--hover": colors.text,
  //       "--button-background-color--hover": colors.textAccent,
  //       "--button-border-color--hover": colors.textAccent,
  //     };
  //   }

  /**
   * Custom styles for the button which are not in tailwindcss
   * @date 3/23/2023 - 7:47:57 PM
   *
   * @type {CSSProperties}
   */

  const styles: CSSProperties | {} = {
    ...communityStylesObj,
    ...(customStyle || {}),
  };

  /**
   * Set button className according to the type of the button
   * @date 3/23/2023 - 7:46:32 PM
   *
   * @type {string}
   */

  const componentClassName: string = classNames(
    `btn outline-none focus:outline-none hover:outline-none cursor-pointer relative disabled:border-opacity-60 disabled:cursor-not-allowed ${className} `,
    {
      "disabled:bg-gray-100 disabled:text-gray-400":
        variant === "primary" || variant === "secondary",
      "disabled:border-gray-400 disabled:text-gray-400 disabled:bg-transparent":
        variant.includes("outline"),
      "bg-primary hover:bg-primary-dark  text-white":
        variant === "primary",
      "bg-secondary text-primary": variant === "secondary",
      "text-primary border border-solid border-primary bg-transparent hover:bg-primary hover:text-white":
        variant === "outline-primary",
      "text-secondary border border-solid border-secondary bg-transparent hover:bg-secondary hover:text-gray-900":
        variant === "outline-secondary",
      "text-white border border-solid border-white bg-transparent hover:bg-white hover:text-primary":
        variant === "outline-white",
      "text-gray-400 border border-solid border-gray-400 bg-transparent hover:bg-gray-500 hover:text-gray-200":
        variant === "outline-gray",
      "bg-transparent text-primary": variant === "link",
      "rounded-full": rounded,
      "community-button": communityStyles,
      "lg:px-7 px-5": padding,
    }
  );

  /**
   * This component checks the type of link and retuns a corresponding
   * component, which can be:
   *  - button element if there is not link passed
   *  - Link component from Next/link if the link is for an internal navigation
   *  - Anchor element if the link for external navigation
   * 
   * @date 3/23/2023 - 7:53:51 PM
   *
   * @param {ComponentProps} {
     link,
     className,
     style,
     target,
     onClick,
    }
   * @returns {ReactElement}
   */

  function Component({
    className,
    style,
    target,
    onClick,
    type,
    children
  }: ComponentProps): ReactElement {
    if (!link)
      return (
        <button
          onClick={onClick}
          type={type}
          style={style}
          className={className}
        >
          {children}
        </button>
      );

    if (isInternalLink)
      return (
        <Link style={style} href={link} className={className}>
          {children}
        </Link>
      );

    return (
      <a
        style={style}
        href={link}
        target={target}
        className={className}
      >
        {children}
      </a>
    );
  }

  return (
    <Component
      className={componentClassName}
      disabled={disabled}
      padding={padding}
      style={!disabled ? styles : {}}
      type={type}
      target={target}
      onClick={onClick}
    >
      {text || children }
    </Component>
  );
}
