/**
 * Some lines in this file are temporary commented
 * because redux and its features are not implemented yet.
 */

import React, { ReactElement } from "react";

// TODO: Should be uncommented when redux will be implemented
// import { useSelector } from "react-redux";

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
  // TODO: Should be uncommented when redux will be implemented
  // const colors = useSelector((state) => state.ui.colors);
  // const styles = communityStyles ? { backgroundColor: colors.textAccent } : {};

  return (
    <div className="h-3 w-full block rounded-lg overflow-hidden relative">
      <div
        // TODO: Should be uncommented when redux will be implemented
        // style={styles}
        className={`h-full w-full absolute top-0 left-0 bg-gray-100  z-0 ${communityStyles ? "opacity-20" : ""}`}
      />
      <div
        style={{
          width: `${percentage}%`,
          // TODO: Should be uncommented when redux will be implemented
          // ...styles,
        }}
        className="h-full relative z-10 bg-primary transition-all"
      />
    </div>
  );
}
