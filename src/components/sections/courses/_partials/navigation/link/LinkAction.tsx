import classNames from "classnames";
import Link from "next/link";
import React from "react";

interface LinkActionProps {
  item: any;
  activeLinkStyle: any;
  isActive: boolean;
  goToLink: () => void;
  children: React.ReactNode;
}

export default function LinkAction({
  item,
  activeLinkStyle,
  isActive,
  goToLink,
  children,
}: LinkActionProps) {
  const classes = classNames(
    "relative block text-gray-500 cursor-pointer",
    { "activable-link": isActive }
  );

  const styles = isActive ? { ...activeLinkStyle } : {};

  return (
    <span className="relative block">
      {item.subitems && item.subitems.length ? (
        <span className={classes} style={styles} onClick={goToLink}>
          {children}
        </span>
      ) : (
        <Link className={classes} style={styles} href={item.link}>
          {children}
        </Link>
      )}
    </span>
  );
}
