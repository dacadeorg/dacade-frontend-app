import classNames from "classnames";
import { useState, useEffect, useRef, ReactElement, forwardRef } from "react";

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
  value?: string | ReadonlyArray<string> | number;
  required?: boolean;
  id?: string;
  name?: string;
  communityStyles?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * Checkbox component
 * @date 3/23/2023 - 9:37:47 AM
 *
 * @export
 * @param {CheckboxProps} {
  checked,
  disabled,
  value,
  required,
  id,
  name,
  communityStyles,
  onChange
}
 * @returns {ReactElement}
 */
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>( function ({
  checked ,
  disabled,
  value,
  required,
  id,
  name,
  communityStyles,
  onChange
}, ref) {

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
      ref={ref}
      id={id}
      type="checkbox"
      checked={checked}
      value={value}
      name={name}
      required={required}
      disabled={disabled}
      className={checkboxClassName}
      style={styles}
      onChange={onChange}
    />
  );
})

Checkbox.displayName = "Checkbox";
export default Checkbox;
