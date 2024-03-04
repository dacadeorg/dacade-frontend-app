import classNames from "classnames";
import { HTMLProps, forwardRef } from "react";

/**
 * Interface for checbox props
 * @date 3/23/2023 - 9:47:35 AM
 *
 * @interface CheckboxProps
 * @typedef {CheckboxProps}
 */
interface CheckboxProps extends HTMLProps<HTMLInputElement> {
  communityStyles?: boolean;
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
const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function ({ disabled, className, communityStyles, ...props }, ref) {
  const styles = communityStyles ? { color: "#0000FF" } : undefined;

  const checkboxClassName = classNames("w-5 h-5 bg-gray-100 rounded border-gray-200 text-primary",className, {
    "cursor-not-allowed": disabled,
    "cursor-pointer": !disabled,
  });

  return <input data-testid="checboxId" ref={ref} {...props} type="checkbox" disabled={disabled} className={checkboxClassName} style={styles} />;
});

Checkbox.displayName = "Checkbox";
export default Checkbox;
