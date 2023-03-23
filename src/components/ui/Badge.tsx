import classNames from "classnames";
import { useRouter } from "next/router";
import { useMemo } from "react";

interface BadgetProps {
  customStyle?: object;
  value: string | number;
  size?: "medium" | "small";
}

export default function Badge({
  customStyle,
  value,
  size = "small",
}: BadgetProps) {
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
  return (
    <span
      className={classNames(
        "font-semibold leading-3 text-center inline-flex items-center justify-center rounded-full text-xxs",
        sizeClasses,
        { "bg-white text-gray-900": isCommunity },
        { "text-white bg-gray-900": !isCommunity }
      )}
      style={customStyle}
    >
      {value}
    </span>
  );
}
