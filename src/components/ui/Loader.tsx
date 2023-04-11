import classNames from "classnames";
import Spinner from "@/icons/spinner.svg";

/**
 * Loader Props Interface
 * @date 3/23/2023 - 5:09:01 PM
 *
 * @interface LoaderProps
 * @typedef {LoaderProps}
 */
interface LoaderProps {
  communityStyles?: boolean;
  className?: string;
}

/**
 * Loader Component
 * @date 3/23/2023 - 5:09:34 PM
 *
 * @export
 * @param {LoaderProps}  {
  communityStyles = false,
  className = "",
}
 * @returns {*}
 */
const colors = {
  text: "#0D61FF",
  accent: "#0D61FF",
  textAccent: "#fff",
  primary: "#0D61FF",
};

export default function Loader({
  communityStyles = false,
  className = "",
}: LoaderProps) {
  const styles = {
    color: colors.textAccent,
  };

  const loaderClasses = classNames(
    `flex items-center relative justify-center !h-12 !w-12 ${className}`,
    {
      "text-primary": !communityStyles,
    }
  );
  return (
    <div
      className={loaderClasses}
      style={{ ...(communityStyles ? styles : {}) }}
    >
      <Spinner height={18} width={18} className="animate-spin" />
    </div>
  );
}
