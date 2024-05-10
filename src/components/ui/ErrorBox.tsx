import { CustomError } from "@/types/error";
import { ReactElement, ReactNode } from "react";

/**
 * ErrorBoxPros interface for component props
 * @date 3/23/2023 - 10:44:22 AM
 *
 * @interface ErrorBoxProps
 * @typedef {ErrorBoxProps}
 */
interface ErrorBoxProps {
  error: CustomError;
  children?: ReactNode;
  className?: string;
  testId?: string;
}

/**
 * ErrorBox component
 * @date 3/22/2023 - 9:12:52 PM
 *
 * @param {ErrorBoxProps} { error, children }
 * @returns {ReactElement}
 */

export default function ErrorBox({ error, children, className = "", testId = "errorBox" }: ErrorBoxProps): ReactElement {
  if (!error.message) return <></>;
  return (
    <div data-testid={testId} className={`bg-red-50 help text-sm rounded-md border border-red-100 text-red-900 px-5 py-2 ${className}`}>
      <p className="font-medium capitalize">{error?.message}</p>
      {error?.details && (
        <ul className="pt-1 list-disc list-inside">
          {Object.keys(error.details).map((key: string, index) => (
            <li key={`generated-key-${index}`}>{error.details[key]}</li>
          ))}
        </ul>
      )}
      {children}
    </div>
  );
}
