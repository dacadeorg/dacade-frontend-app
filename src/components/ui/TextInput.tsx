import { useState, FC, ChangeEvent } from "react";

/**
 * Interface for TextInput component props
 * @date 3/22/2023 - 4:31:28 PM
 *
 * @interface Props
 * @typedef {Props}
 */
interface Props {
  type?: string;
  value?: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  inputClass?: string;
  error?: string;
  handleInput?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * TextInput component
 * @date 3/22/2023 - 4:31:51 PM
 *
 * @param {Prop} props
 * @returns {JSX}
 */
const TextInput: FC<Props> = ({
  type,
  value = "",
  label,
  disabled,
  placeholder,
  inputClass,
  error,
  handleInput,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFilled = value.trim().length > 0;

  return (
    <div>
      <div className="floating-input relative">
        {label && (
          <label
            className={`
              ${
                !isFilled && !isFocused ? "text-gray-400 flex items-center" : ""
              }
              ${
                isFocused || isFilled
                  ? "text-gray-400 scale-75 -translate-y-3 translate-x-1"
                  : ""
              }
              ${error ? "text-red-600" : ""}
              ${isFocused && !error ? "text-blue-500" : ""}
              absolute top-0 left-0 text-lg px-5 py-5 z-10 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out items-center
            `}
          >
            {label}
          </label>
        )}
        <textarea
          value={value}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled}
          className={`
            w-full border border-solid border-gray-200 h-56 resize-none m-0 pt-5 md:pt-7.5 pl-15 pr-2 md:px-10.75 block text-lg focus:outline-none placeholder-gray-400 placeholder-opacity-100
            ${inputClass ? inputClass : ""}
          `}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleInput}
        />
      </div>
      {error && (
        <div className="bg-red-50 help text-sm text-red-900 px-5 py-1.5">
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default TextInput;
