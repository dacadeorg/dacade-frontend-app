import classNames from "classnames";
import React, { HTMLProps, useMemo } from "react";

interface RadioProps extends HTMLProps<HTMLInputElement> {
  communityStyles?: boolean;
  className?: string;
}

const colors = {
  text: "#0D61FF",
  accent: "#0D61FF",
  textAccent: "#fff",
  primary: "#0D61FF",
};

/**
 * Radio Component
 * @date 3/23/2023 - 3:14:26 PM
 *
 * @interface RadioProps
 * @typedef {RadioProps}
 */

export default function Radio({ disabled, communityStyles, className = "", ...props }: RadioProps) {
  const styles = useMemo(() => (!communityStyles ? {} : { color: colors?.textAccent }), [communityStyles]);

  const radioClassName = classNames("w-9 h-9 border-gray-400 text-primary rounded-full", { "cursor-not-allowed border-4": disabled }, { "cursor-pointer": !disabled }, className);

  return <input {...props} className={radioClassName} style={styles} type="radio" />;
}
