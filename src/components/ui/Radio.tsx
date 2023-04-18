import classNames from "classnames";
import React, { HTMLProps, useMemo } from "react";

/**
 * Radio Component
 * @date 3/23/2023 - 3:14:26 PM
 *
 * @interface RadioProps
 * @typedef {RadioProps}
 */

interface RadioProps extends HTMLProps<HTMLInputElement> {
  communityStyles?: boolean;
}

export default function Radio({
  disabled,
  communityStyles,
  ...props
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

  return <input {...props} style={styles} type="radio" />;
}
