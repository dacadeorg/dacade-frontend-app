import Link from "next/link";
import { ReactElement, ReactNode } from "react";

/**
 * Interface for NavItem component props
 * @date 3/22/2023 - 5:33:20 PM
 *
 * @interface NavItemProps
 * @typedef {NavItemProps}
 */
interface NavItemProps {
  type: string;
  to: string;
  children: ReactNode;
}

/**
 *  NavItem component
 * @date 3/22/2023 - 5:33:34 PM
 *
 * @param {{ type?: string; to?: string; children: any; }} { type = "item", to = "/", children }
 * @returns {ReactElement}
 */
export default function NavItem({
  type = "item",
  to = "/",
  children,
}: NavItemProps): ReactElement {
  return (
    <li className={`nav-${type}`}>
      <Link href={to}>{children}</Link>
    </li>
  );
}
