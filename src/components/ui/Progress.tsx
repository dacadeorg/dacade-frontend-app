import { useSelector } from "@/hooks/useTypedSelector";
import React, { ReactElement } from "react";

/**
 * Progress Component props interface.
 * @date 3/22/2023 - 5:02:10 PM
 *
 * @interface ProgressProps
 * @typedef {ProgressProps}
 */

interface ProgressProps {
  communityStyles: boolean;
  percentage: number;
}

/**
 * Progress Component used in the Wrapper Component
 * @date 3/22/2023 - 4:57:23 PM
 *
 * @export
 * @param {ProgressProps} {
  communityStyles,
  percentage,
}
 * @returns {ReactElement}
 */

export default function Progress({ communityStyles, percentage }: ProgressProps): ReactElement {
  const colors = useSelector((state) => state.ui.colors);
  const styles = communityStyles ? { backgroundColor: colors.textAccent } : {};

  return (
    <div data-testid="progress" className="h-3 w-full block rounded-lg overflow-hidden relative">
      <div style={styles} className={`h-full w-full absolute top-0 left-0 bg-gray-100  z-0 ${communityStyles ? "opacity-20" : ""}`} />
      <div style={{ width: `${percentage}%`, ...styles }} className="h-full relative z-10 bg-primary transition-all" />
    </div>
  );
}
