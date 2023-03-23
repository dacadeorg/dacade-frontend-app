import { ReactElement, ReactNode } from "react"
import classNames from "classnames";

interface H3Props {
  bold?: boolean;
  children: ReactNode
}

export default function H3 ({ bold = true, children }: H3Props): ReactElement {
  const h3ClassName = classNames('leading-normal text-default capitalize text-xl md:text-.5xl', { 'font-medium' :bold, 'font-normal': !bold});
  return (
    <h3 className={h3ClassName}>
      {children}
    </h3>
  );
};
