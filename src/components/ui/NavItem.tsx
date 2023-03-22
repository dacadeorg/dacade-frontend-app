import Link from "next/link";
import React, { ReactNode } from "react";

interface NavItemProps {
  type?: string;
  to?: string;
  children?: ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({
  type = "item",
  to = "/",
  children,
}) => {
  return (
    <li className={`nav-${type}`}>
      <Link href={to}>{children}</Link>
    </li>
  );
};

export default NavItem;
