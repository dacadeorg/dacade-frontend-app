import { ReactElement, ReactNode } from "react";

type HintProps = {
  children: ReactNode;
  className?: string;
};

function Hint({ children, className }: HintProps): ReactElement {
  return <div className={`bg-blue-50 text-blue-500 p-3 border border-blue-200 rounded text-base hint-container ${className}`}>{children}</div>;
}

export default Hint;
