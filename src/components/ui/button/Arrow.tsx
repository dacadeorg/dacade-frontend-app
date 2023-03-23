// TODO Currently blocked because this component is not yet done
import Button from "./index";
import Spinner from "/assets/icons/spinner.svg";
import ArrowRightIcon from "/assets/icons/arrow-right.svg";
import { ReactElement, ReactNode } from "react";
import classNames from "classnames";

/**
 * Interface for ArrowButton props
 * @date 3/23/2023 - 5:30:39 PM
 *
 * @interface ArrowButtonProps
 * @typedef {ArrowButtonProps}
 */
interface ArrowButtonProps {
  loading?: boolean;
  disabled?: boolean;
  rounded?: boolean;
  type?: string;
  variant?: string;
  padding?: boolean | string;
  children: ReactNode;
  customStyle?: object | null;
  link?: string;
  target?: string;
  minWidthClass: string;
  communityStyles: boolean;
}

/**
 * Arrow components
 * @date 3/23/2023 - 5:31:07 PM
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
}
 * @returns {ReactElement}
 */
export default function ArrowButton({
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
}: ArrowButtonProps): ReactElement {
  const isLeft = variant === "left";
  const directionClass = isLeft ? "-rotate-90" : "rotate-90";
  const arrowClassNames = classNames(`w-4 h-4 text-gray-500 `, {
    "rounded-full": rounded,
  });

  const inputListeners = () => {};

  return (
    <Button
      padding={false}
      community-styles={communityStyles}
      className={classNames(minWidthClass, {
        "py-2 pl-5 pr-3.5": padding,
      })}
      disabled={disabled}
      link={link}
      loading={loading}
      type={type}
      custom-style={customStyle}
      target={target}
      variant={variant}
      {...inputListeners}
    >
      <span className="flex h-full text-left items-center justify-between">
        <span
          v-if={isLeft}
          className={classNames("block", { "pr-2.5": children })}
        >
          <ArrowRightIcon
            v-if={!loading}
            className={[directionClass, arrowClassNames, "transform"]}
          />
          <Spinner
            v-else
            className={[arrowClassNames, "animate-spin"]}
          />
        </span>
        <span
          className={classNames("leading-6 block", {
            "pr-6": !isLeft && children,
          })}
        >
          {children}
        </span>
        <span v-if={!isLeft} className="block">
          <ArrowRightIcon
            v-if={!loading}
            className={[directionClass, arrowClassNames, "transform"]}
          />
          <Spinner
            v-else
            className={[arrowClassNames, "animate-spin"]}
          />
        </span>
      </span>
    </Button>
  );
}
