import Spinner from "@/icons/spinner.svg";
import ArrowRightIcon from "@/icons/arrow-right.svg";
import { CSSProperties, ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import { ButtonProps } from "@/types/button";

/**
 * Component props type.
 * @date 3/23/2023 - 7:29:54 PM
 *
 * @typedef {ComponentProps}
 * @returns {ReactElement}
 */

interface WalletButtonProps extends ButtonProps {
  className: string;
  style: CSSProperties;
  minWidthClass: string;
  direction: string;
  arrowClasses: string;
}

/**
 * WalletButton Component 
 * @date 5/3/2023 - 10:44:43 AM
 *
 * @export
 * @param {WalletButtonProps} {
  text = "",
  loading = false,
  disabled = false,
  rounded = true,
  variant = "primary",
  type = "submit",
  padding = true,
  margin = "",
  customStyle = null,
  link = null,
  target = "_self",
  communityStyles = false,
  minWidthClass = "min-w-44",
  direction = "right",
  arrowClasses = "",
  children,
  ...props
}
 * @returns {ReactElement}
 */
export default function WalletButton({
  text = "",
  loading = false,
  disabled = false,
  rounded = true,
  variant = "primary",
  type = "submit",
  padding = true,
  margin = "",
  customStyle = null,
  link = "",
  target = "_self",
  communityStyles = false,
  minWidthClass = "min-w-44",
  direction = "right",
  arrowClasses = "",
  children,
  onClick,
  ...props
}: WalletButtonProps): ReactElement {
  const router = useRouter();
  const wallatClassname = classNames(
    `py-5.5 pl-5 pr-3.5 w-full rounded-none text-gray-400 bg-transparent z-999 hover:bg-gray-100 hover:text-gray-800 ${margin}`,
    {
      "rounded-full": rounded,
      "px-4": padding,
    }
  );

  return (
    <button
      {...props}
      disabled={disabled}
      className={wallatClassname}
      style={customStyle as CSSProperties}
      type={type}
      onClick={(event) => {
        if (!link) {
          onClick?.(event);
        } else {
          router.push(link);
        }
      }}
    >
      <span className="flex h-full text-left items-center justify-between">
        <span className="leading-6 block">{text || children}</span>
        <span className="block">
          {loading ? (
            <Spinner className={`${arrowClasses} animate-spin`} />
          ) : (
            <ArrowRightIcon className={`${arrowClasses} transform`} />
          )}
        </span>
      </span>
    </button>
  );
}
