import { ReactElement, ReactNode } from "react";

type HintProps = {
  children: ReactNode;
  className?: string;
};

function Hint({ children, className }: HintProps): ReactElement {
  return <div className={`bg-highlight text-brand p-3 border border-light-brand rounded text-base hint-container ${className}`}>{children}</div>;
}

export default Hint;
