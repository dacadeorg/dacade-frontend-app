import classNames from "classnames";
import { useRouter } from "next/router";
import { HTMLProps, ReactElement, useMemo } from "react";

/**
 * Interface for Badge component props
 * @date 3/23/2023 - 3:43:31 PM
 *
 * @interface BadgeProps
 * @typedef {BadgeProps}
 */
interface BadgeProps extends Omit<HTMLProps<HTMLSpanElement>, "size"> {
  customStyle?: object;
  value?: string | number;
  size?: "medium" | "small";
  className?: string;
}

/**
 * Badge component
 * @date 3/23/2023 - 3:43:45 PM
 *
 * @export
 * @param {BadgeProps} {
  customStyle,
  value,
  size = "small",
}
 * @returns {ReactElement}
 */
export default function Badge({ customStyle, value, size = "small", className, ...props }: BadgeProps): ReactElement {
  const sizeClasses = useMemo(
    () =>
      ({
        medium: "w-6 h-6 text-sm",
        small: "h-4 w-4 text-xxs",
      }[size]),
    [size]
  );

  const router = useRouter();
  const isCommunity: boolean = router.pathname.startsWith("communities-slug__");

  if (value === null || value === "") {
    return <></>;
  }
  return (
    <span
      {...props}
      className={classNames(
        "font-semibold leading-3 text-center inline-flex items-center justify-center rounded-full text-xxs",
        sizeClasses,
        className,
        { "bg-white text-gray-900": isCommunity },
        { "text-white bg-gray-900": !isCommunity }
      )}
      style={customStyle}
    >
      {value}
    </span>
  );
}
