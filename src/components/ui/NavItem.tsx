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
  type?: string;
  to?: string;
  children: ReactNode;
  className?: string;
  testId?: string;
  navItemLinkTestId?: string;
}

/**
 *  NavItem component
 * @date 3/22/2023 - 5:33:34 PM
 *
 * @param {{ type?: string; to?: string; children: ReactNode; }} { type = "item", to = "/", children }
 * @returns {ReactElement}
 */
export default function NavItem({ type = "item", to = "/", children, className, testId = "nav-item", navItemLinkTestId = "nav-item-link" }: NavItemProps): ReactElement {
  return (
    <li data-testid={testId} className={`nav-${type} ${className}`}>
      <Link data-testid={navItemLinkTestId} href={to}>
        {children}
      </Link>
    </li>
  );
}
