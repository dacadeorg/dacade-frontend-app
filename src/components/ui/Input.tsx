import { HTMLProps, forwardRef, useMemo, useState } from "react";
import classNames from "classnames";

/**
 * Interface for input component props
 * @date 3/24/2023 - 1:09:06 PM
 *
 * @interface Props
 * @typedef {Props}
 */
interface InputProps extends Omit<HTMLProps<HTMLInputElement>, "onInput"> {
  type?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string;
  inputClass?: string;
  fontSize?: string;
  onInput?: (value: string) => void;
}

/**
 * Component for a customized input
 * @date 3/24/2023 - 1:40:02 PM
 *
 * @export
 * @param {InputProps} {
  type = "text",
  label,
  disabled = false,
  placeholder = null!,
  error,
  inputClass,
  fontSize = "lg",
  onInput,
}
 * @returns {ReactElement}
 */
const Input = forwardRef<HTMLInputElement, InputProps>(function (
  { type = "text", label, disabled = false, placeholder = null!, error, inputClass, value, fontSize = "lg", onInput, ...props },
  ref
) {
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = useMemo(() => String(value).trim().length > 0, [value]);

  const fontSizeClasses = () => {
    switch (fontSize) {
      case "2xl":
        break;
      case "xl":
        break;
      case "lg":
        break;
      case "sm":
        break;
      case "xs":
        return `text-${fontSize}`;
      default:
        return "text-base";
    }
  };

  const labelClasssName = classNames(
    "absolute top-0 left-0 text-lg px-5 py-5 z-10 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out items-center",
    {
      "text-gray-400 flex items-center": !isFilled && !isFocused,
      "text-gray-400 scale-75 -translate-y-3 translate-x-1": isFocused || isFilled,
      "text-red-600": error,
      "text-gray-400": !isFocused && isFilled,
      "text-blue-500": isFocused && !error,
    }
  );

  const inputComponentClassName = classNames("relative dac-input", {
    "floating-input": label,
  });

  const inputElementClassName = classNames("rounded-md focus:outline-none focus:shadow-sm w-full", inputClass, fontSizeClasses(), {
    "text-gray-400 scale-75 -translate-y-3 translate-x-1 bg-gray-50": disabled,
    "border-red-100 rounded-b-none": error,
    "focus:border-gray-200 border-gray-200": !error,
  });

  return (
    <div className="relative">
      <div className={inputComponentClassName}>
        {label && <label className={labelClasssName}>{label}</label>}
        <input
          {...props}
          ref={ref}
          className={inputElementClassName}
          value={value}
          type={type}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlurCapture={() => setIsFocused(false)}
        />
      </div>
      {error && (
        <div className="bg-red-50 help text-sm rounded-b-md border border-t-0 border-red-100 text-red-900 px-5 py-1.5">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
