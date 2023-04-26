import classNames from "classnames";
import Spinner from "@/icons/spinner.svg";
import { useSelector } from "@/hooks/useTypedSelector";

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

export default function Loader({
  communityStyles = false,
  className = "",
}: LoaderProps) {
  const colors = useSelector((state) => state.ui.colors);

  const styles = {
    color: colors.textAccent,
  };

  const loaderClasses = classNames(
    `flex items-center relative justify-center ${className}`,
    {
      "text-primary": !communityStyles,
    }
  );
  return (
    <div
      className={loaderClasses}
      style={{ ...(communityStyles ? styles : {}) }}
    >
      <Spinner className="animate-spin h-12 w-12" />
    </div>
  );
}
