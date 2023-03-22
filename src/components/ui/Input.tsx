import { useState } from "react";

interface Props {
    type?: string;
    value?: string | number;
    label?: string;
    disabled?: boolean;
    placeholder?: string;
    error?: string;
    inputClass?: string;
    fontSize?: string;
    onInput?: (value: string) => void;
}

const Input: React.FC<Props> = ({
    type = "text",
    value = "",
    label = null,
    disabled = false,
    placeholder = null!,
    error = null,
    inputClass = null,
    fontSize = "lg",
    onInput,
}) => {
    const [isFocused, setIsFocused] = useState(false);

    const isFilled = String(value)?.trim().length > 0;

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (onInput) {
            onInput(event.target.value);
        }
    };

    const fontSizeClasses = () => {
        switch (fontSize) {
            case "2xl":
            case "xl":
            case "lg":
            case "sm":
            case "xs":
                return `text-${fontSize}`;
            default:
                return "text-base";
        }
    };

    return (
        <div className="relative">
            <div
                className={`relative dac-input ${
                    label ? "floating-input" : ""
                } ${isFilled || isFocused ? "floating-input" : ""}`}
            >
                {label && (
                    <label
                        className={`text-gray-400 flex items-center ${
                            !isFilled && !isFocused
                                ? "text-gray-400 flex items-center"
                                : "text-gray-400 scale-75 -translate-y-3 translate-x-1"
                        } ${error ? "text-red-600" : ""} ${
                            isFocused && !error ? "text-blue-500" : ""
                        } absolute top-0 left-0 text-lg px-5 py-5 z-10 h-full pointer-events-none transform origin-left transition-all duration-100 ease-in-out items-center`}
                    >
                        {label}
                    </label>
                )}
                <input
                    className={`rounded-md focus:outline-none focus:shadow-sm w-full ${
                        disabled
                            ? "text-gray-400 scale-75 -translate-y-3 translate-x-1 bg-gray-50"
                            : ""
                    } ${error ? "border-red-100 rounded-b-none" : ""} ${
                        !error ? "focus:border-gray-200 border-gray-200" : ""
                    } ${inputClass} ${fontSizeClasses()}`}
                    value={value}
                    type={type}
                    placeholder={placeholder}
                    autoComplete="off"
                    disabled={disabled}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onInput={handleInput}
                />
            </div>
            {error && (
                <div className="bg-red-50 help text-sm rounded-b-md border border-t-0 border-red-100 text-red-900 px-5 py-1.5">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default Input;
