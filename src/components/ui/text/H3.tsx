import { ReactElement, ReactNode } from "react";
import classNames from "classnames";

/**
 * Interface for the H3 component props
 * @date 3/23/2023 - 6:23:10 PM
 *
 * @interface H3Props
 * @typedef {H3Props}
 */
interface H3Props {
  bold?: boolean;
  children: ReactNode;
  testId?: string;
}

/**
 * Component to change the header three style
 * @date 3/23/2023 - 6:21:21 PM
 *
 * @export
 * @param {H3Props} { bold = true, children }
 * @returns {ReactElement}
 */
export default function H3({ bold = true, children, testId = "h3" }: H3Props): ReactElement {
  const h3ClassName = classNames("leading-normal text-default text-xl md:text-.5xl", { "font-medium": bold, "font-normal": !bold });
  return (
    <h3 data-testid={testId} className={h3ClassName}>
      {children}
    </h3>
  );
}
