import { ReactElement, ReactNode } from "react";

type HintProps = {
  children: ReactNode;
  className?: string;
};

function Hint({ children, className }: HintProps): ReactElement {
  return <div className={`bg-yellow-50 text-yellow-900 py-5 px-8 text-base hint-container ${className}`}>{children}</div>;
}

export default Hint;
