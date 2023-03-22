import { ReactElement, ReactNode } from "react";

interface CustomError extends Error {
  details: { [key: string]: string };
}

type ErrorBoxProps = {
  error: CustomError;
  children?: ReactNode;
};

/**
 * This is ErrorBox component
 * @date 3/22/2023 - 9:12:52 PM
 *
 * @param {ErrorBoxProps} { error, children }
 * @returns {ReactElement}
 */

const ErrorBox = ({ error, children }: ErrorBoxProps): ReactElement => {
  return (
    <div className="bg-red-50 help text-sm rounded-md border border-red-100 text-red-900 px-5 py-2">
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
};

export default ErrorBox;
