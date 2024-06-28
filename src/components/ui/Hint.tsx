import { ReactElement, ReactNode } from "react";

type HintProps = {
  children: ReactNode;
  className?: string;
};

function Hint({ children, className }: HintProps): ReactElement {
  return <div className={`bg-blue-50 text-primary p-3 border border-blue-200 rounded text-sm hint-container ${className}`}>{children}</div>;
}

export default Hint;
