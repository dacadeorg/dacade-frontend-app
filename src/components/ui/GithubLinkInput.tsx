import { ChangeEvent, HTMLProps, ReactElement, forwardRef, useMemo, useState } from "react";
import GithubIcon from "@/icons/github.svg";
import classNames from "classnames";

/**
 * GithubLinkInput props interface
 * @date 3/22/2023 - 5:46:00 PM
 *
 * @interface InputProps
 * @typedef {InputProps}
 */

interface GithubLinkInputProps extends HTMLProps<HTMLInputElement> {
  type?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  error?: string | null;
  handleInput?: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * GithubLinkInput component used in :
 *  - Submission Component
 *  - Feedback Component
 *  
 * @date 3/22/2023 - 5:36:40 PM
 *
 * @export
 * @param {InputProps} {
  type = "text",
  value = "",
  label = null,
  disabled = false,
  isGithubLink = false,
  placeholder,
  error = null,
  handleInput,
}
 * @returns {ReactElement}
 */

export default forwardRef<HTMLInputElement, GithubLinkInputProps>(function GithubLinkInput(
  { type = "text", label, disabled = false, placeholder, error = null, handleInput, ...props },
  ref
): ReactElement {
  const [isFocused, setIsFocused] = useState(false);

  const [value, setValue] = useState("");

  const isFilled = useMemo(() => value.trim().length > 0, [value]);

  /**
   * Label style classes according to diffenrent conditions.
   * @date 3/22/2023 - 5:34:01 PM
   *
   * @type {string}
   */

  const labelClassName: string = classNames(
    "absolute top-0 left-0 text-lg px-0 py-5 z-10 w-full h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out outline-none border-none items-center",
    {
      "text-gray-400 flex items-center": !isFilled && !isFocused,
      "text-gray-400 scale-75 -translate-y-3 translate-x-1": isFocused || isFilled,
      "text-red-600": error,
      "text-blue-500": isFocused && !error,
    }
  );

  /**
   * Input style classes according to different conditions.
   * @date 3/22/2023 - 5:43:36 PM
   *
   * @type {string}
   */

  const inputClassName: string = classNames(
    "rounded-b w-full focus:outline-none active:outline-none active:shadow-none focus:shadow-none px-0 h-16.25 border-none focus:border-none outline-none active:border-none text-lg active:border-0 leading-7",
    {
      "text-gray-400 scale-75 -translate-y-3 translate-x-1 bg-gray-50": disabled,
      "border-red-100": error,
    }
  );

  return (
    <div className="flex items-center w-full border border-t-0 border-gray-200">
      <div className="flex-none pl-3.75">
        <GithubIcon className="relative flex-none text-gray-400 m-0 p-0 block -mt-0.5" />
      </div>
      <div className="relative flex-1 pl-3 pr-10.75">
        <label className={labelClassName}>{label}</label>
        <input
          ref={ref}
          data-testid="githubLinkInput-textbox"
          className={inputClassName}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setValue(e.target.value)}
          onBlurCapture={() => setIsFocused(false)}
          onInput={handleInput}
          autoComplete="off"
          {...props}
        />
        {error && (
          <div className="absolute -bottom-7 help text-sm text-red-900">
            <p>{error}</p>
          </div>
        )}
      </div>
    </div>
  );
});
