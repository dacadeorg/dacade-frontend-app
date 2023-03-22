import React, { useMemo } from "react";

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

  return (
    <input
      id={id}
      checked={checked}
      onChange={onChange}
      v-model="vModalValue"
      value={value}
      className={`'w-9 h-9 rounded border-gray-400 text-primary rounded-full',
      ${disabled ? "cursor-not-allowed border-4" : "cursor-pointer"}`}
      name={name}
      required={required}
      style={styles}
      type="radio"
      disabled={disabled}
    />
  );
}
