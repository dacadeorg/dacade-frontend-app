import classNames from "classnames";
import { useState, useEffect, useRef, ReactElement } from "react";

/**
 * Interface for checbox props
 * @date 3/23/2023 - 9:47:35 AM
 *
 * @interface CheckboxProps
 * @typedef {CheckboxProps}
 */
interface CheckboxProps {
  checked?: boolean;
  disabled?: boolean;
  data?: string | ReadonlyArray<string> | number;
  required?: boolean;
  id?: string;
  name?: string;
  communityStyles?: boolean;
}

/**
 * Checkbox component
 * @date 3/23/2023 - 9:37:47 AM
 *
 * @export
 * @param {CheckboxProps} {
  checked = false,
  disabled = false,
  data = "",
  required = false,
  id = "",
  name = "",
  communityStyles = false,
}
 * @returns {ReactElement}
 */
export default function Checkbox({
  checked = false,
  disabled = false,
  data = "",
  required = false,
  id = "",
  name = "",
  communityStyles = false,
}: CheckboxProps): ReactElement {
  const [checkedValue, setCheckedValue] = useState<boolean>(checked);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCheckedValue(checked);
  }, [checked]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(event.target.checked);
  };

  const styles = communityStyles ? { color: "#0000FF" } : undefined;

  const checkboxClassName: string = classNames(
    "w-5 h-5 bg-gray-100 rounded border-gray-200 text-primary",
    {
      "cursor-not-allowed": disabled,
      "cursor-pointer": !disabled,
    }
  );

  return (
    <input
      id={id}
      ref={inputRef}
      type="checkbox"
      checked={checkedValue}
      value={data}
      name={name}
      required={required}
      disabled={disabled}
      className={checkboxClassName}
      style={styles}
      onChange={handleInputChange}
    />
  );
}
