import Button from ".";
import Spinner from "@/icons/spinner.svg";
import ArrowRightIcon from "@/icons/arrow-right.svg";
import { HTMLProps, ReactElement, ReactNode, useMemo } from "react";
import classNames from "classnames";

/**
 * Interface for ArrowButton props
 * @date 3/23/2023 - 5:30:39 PM
 *
 * @interface ArrowButtonProps
 * @typedef {ArrowButtonProps}
 */
interface ArrowButtonProps
  extends Pick<HTMLProps<HTMLButtonElement>, "onClick"> {
  loading?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  type?: "submit" | "button" | "reset" | undefined;
  variant?: string;
  padding?: boolean;
  children?: ReactNode;
  customStyle?: object | null;
  link?: string;
  target?: string;
  minWidthClass?: string;
  className?: string;
  communityStyles?: boolean;
  direction?: "left" | "right" | "up" | "down";
  arrowClasses?: string;
  onClick?: () => void;
}

/**
 * Arrow components
 * @date 3/24/2023 - 1:43:01 PM
 *
 * @export
 * @param {ArrowButtonProps} {
  loading,
  disabled,
  rounded,
  type = "primary",
  variant = "submit",
  padding,
  children,
  customStyle = null,
  link = "",
  target = "",
  minWidthClass = "min-w-44",
  communityStyles,
  arrowClasses,
}
 * @returns {ReactElement}
 */
export default function ArrowButton({
  loading = false,
  disabled = false,
  rounded = true,
  type = "submit",
  variant = "primary",
  padding,
  children,
  customStyle = null,
  link = "",
  target = "",
  direction = "right",
  minWidthClass = "min-w-44",
  communityStyles,
  arrowClasses = "",
  onClick,
  className = "",
}: ArrowButtonProps): ReactElement {
  const isLeft = direction === "left";

  const directionClass = useMemo((): string => {
    switch (direction) {
      case "left":
        return "-rotate-180";
      case "down":
        return "rotate-90";
      case "up":
        return "-rotate-90";
      default:
        return "";
    }
  }, [direction]);

  const arrowClassNames = classNames(`${arrowClasses}`, {
    "rounded-full": rounded,
  });

  return (
    <Button
      text={""}
      loading={loading}
      disabled={disabled}
      rounded={true}
      padding={false}
      variant={variant}
      customStyle={customStyle}
      link={link}
      target={target}
      type={type}
      communityStyles={communityStyles}
      onClick={onClick}
      className={classNames(`group ${minWidthClass} ${className}`, {
        "py-2 pl-5 pr-3.5": padding,
      })}
    >
      <span className="flex items-center justify-between h-full text-left">
        {isLeft && (
          <span
            className={classNames("block", { "pr-2.5": children })}
          >
            {!loading ? (
              <ArrowRightIcon
                className={`${directionClass} ${arrowClassNames} text-white transform`}
              />
            ) : (
              <Spinner
                className={`${arrowClassNames} text-white animate-spin`}
              />
            )}
          </span>
        )}

        <span
          className={classNames("leading-6 block", {
            "pr-6": !isLeft && children,
          })}
        >
          {children}
        </span>

        {!isLeft && (
          <span className="block">
            {loading ? (
              <Spinner
                className={`${arrowClassNames} text-white animate-spin`}
              />
            ) : (
              <ArrowRightIcon
                className={`${directionClass} ${arrowClassNames} text-white transform`}
              />
            )}
          </span>
        )}
      </span>
    </Button>
  );
}
