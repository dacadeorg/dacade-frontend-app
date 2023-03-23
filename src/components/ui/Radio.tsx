import classNames from "classnames";
import React, { useMemo } from "react";

/**
 * Radio Component
 * @date 3/23/2023 - 3:14:26 PM
 *
 * @interface RadioProps
 * @typedef {RadioProps}
 */

interface RadioProps {
  checked: boolean;
  disabled?: boolean;
  value?: string | number | readonly string[] | undefined;
  data?: string | number | readonly string[] | undefined;
  required?: boolean;
  id?: string;
  name?: string;
  communityStyles?: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export default function Radio({
  id,
  disabled,
  name,
  checked,
  required,
  value,
  communityStyles,
  onChange,
}: RadioProps) {
  const colors = {
    text: "#0D61FF",
    accent: "#0D61FF",
    textAccent: "#fff",
    primary: "#0D61FF",
  };

  const styles = useMemo(
    () => (!communityStyles ? {} : { color: colors.textAccent }),
    [communityStyles, colors.textAccent]
  );

  const radioClass = classNames(
    "w-9 h-9 border-gray-400 text-primary rounded-full",
    { "cursor-not-allowed border-4": disabled },
    { "cursor-pointer": !disabled }
  );

  return (
    <input
      id={id}
      checked={checked}
      onChange={onChange}
      value={value}
      className={radioClass}
      name={name}
      required={required}
      style={styles}
      type="radio"
      disabled={disabled}
    />
  );
}
