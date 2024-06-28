import classNames from "classnames";
import React, { ReactElement } from "react";
import RefreshIcon from "@/icons/refresh.svg";

/**
 * Interface for Loader component props
 * @date 3/23/2023 - 8:17:10 PM
 *
 * @interface LoaderProps
 * @typedef {LoaderProps}
 */
interface LoaderProps {
  loading: boolean;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onInput?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  testId?: string;
}

/**
 *  Loader component
 * @date 3/23/2023 - 8:16:53 PM
 *
 * @export
 * @param {LoaderProps} {
  loading,
  onClick,
  onInput,
}
 * @returns {ReactElement}
 */

export default function Loader({ loading, onClick, onInput, className, testId = "loader" }: LoaderProps): ReactElement {
  const loadingClassName = classNames({
    "bg-secondary": loading,
    "hover:bg-gray-200": !loading,
  });
  const refleshClassName = classNames({
    "spinning-animation": loading,
  });
  return (
    <div
      data-testid={testId}
      className={`h-15 w-15 rounded-full border border-solid cursor-pointer flex items-center justify-center text-tertiary bg-white ${loadingClassName} ${className}`}
      onClick={onClick}
      onInput={onInput}
    >
      <RefreshIcon className={refleshClassName} />
    </div>
  );
}
