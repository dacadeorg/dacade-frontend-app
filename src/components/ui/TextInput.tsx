import classNames from "classnames";
import { useState, ReactElement, useMemo, HTMLProps, forwardRef } from "react";

/**
 * Interface for TextInput component props
 * @date 3/22/2023 - 4:31:28 PM
 *
 * @interface Props
 * @typedef {Props}
 */
interface TextInputProps extends HTMLProps<HTMLTextAreaElement> {
  value?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  inputClass?: string;
  error?: string | null;
  testId?: string;
  errorTestId?: string;
  labelTestId?: string;
}

/**
 * TextInput component
 * @date 3/22/2023 - 4:31:51 PM
 *
 * @param {TextInputProps} props
 * @returns {ReactElement}
 */
export default forwardRef<HTMLTextAreaElement, TextInputProps>(function TextInput(
  { label, disabled = false, placeholder, inputClass = "", error = null, value = "", testId = "textarea", labelTestId = "inputlabel", errorTestId = "inputerror", ...props },
  ref
): ReactElement {
  const [isFocused, setIsFocused] = useState(false);
  const isFilled = useMemo(() => value.trim().length > 0, [value]);

  const labelClassName = classNames(
    "absolute top-0 left-0 text-lg px-5 py-5 z-10 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out items-center",
    {
      "text-gray-400 flex items-center": !isFilled && !isFocused,
      "text-gray-400 scale-75 -translate-y-3 translate-x-1": isFocused || isFilled,
      "text-red-600": error,
      "text-blue-500": isFocused && !error,
    }
  );

  const textareaClassName = classNames(
    "w-full border border-solid border-gray-200 h-56 resize-none m-0 pt-5 md:pt-7.5 pl-15 pr-2 md:px-10.75 block text-lg focus:outline-none placeholder-gray-400 placeholder-opacity-100",
    inputClass
  );

  return (
    <div data-testid={testId}>
      <div className="floating-input relative">
        {label && (
          <label data-testid={labelTestId} className={labelClassName}>
            {label}
          </label>
        )}

        <textarea
          {...props}
          ref={ref}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          className={textareaClassName}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      {error && (
        <div data-testid={errorTestId} className="bg-red-50 help text-sm text-red-900 px-5 py-1.5">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
});
