import classNames from "classnames";
import Spinner from "../../../public/assets/icons/spinner.svg";

/**
 * Loader Props Interface
 * @date 3/23/2023 - 5:09:01 PM
 *
 * @interface LoaderProps
 * @typedef {LoaderProps}
 */
interface LoaderProps {
  communityStyles?: boolean;
}

/**
 * Loader Component
 * @date 3/23/2023 - 5:09:34 PM
 *
 * @export
 * @param {LoaderProps} { communityStyles = false }
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
}: LoaderProps) {
  const styles = {
    color: colors.textAccent,
  };

  const loaderClasses = classNames(
    "flex items-center relative justify-center !h-12 !w-12",
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
