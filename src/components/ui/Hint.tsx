import { ReactElement, ReactNode } from "react";

type HintProps = {
  children: ReactNode;
  className?: string;
};

function Hint({ children, className }: HintProps): ReactElement {
  return <div className={`bg-surface-bg-highlight text-surface-text-brand p-3 border border-surface-border-brand rounded text-base hint-container ${className}`}>{children}</div>;
}

export default Hint;
