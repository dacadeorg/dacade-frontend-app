import { ReactElement, ReactNode } from "react";

type HintProps = {
children: ReactNode
}

function Hint({ children }: HintProps): ReactElement {
  return (
    <div className="bg-yellow-50 text-yellow-900 py-5 px-8 border border-solid border-yellow-100 text-base hint-container">
      {children}
    </div>
  );
}

export default Hint;
