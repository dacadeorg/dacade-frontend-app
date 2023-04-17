import Link from "next/link";
import { ReactElement, ReactNode, useState } from "react";

/**
 * Activable link props interface
 * @date 4/17/2023 - 12:34:13 PM
 *
 * @interface ActivableLinkProps
 * @typedef {ActivableLinkProps}
 */
interface ActivableLinkProps {
  item: {
    subitems?: Array<any>;
    link: string;
  };
  activeLinkStyle?: object;
  isActive?: boolean;
  goToLink?: () => void;
  children: ReactNode;
}

/**
 * ActivavableLink component
 * @date 4/17/2023 - 12:34:39 PM
 *
 * @export
 * @param {ActivableLinkProps} {
  item,
  activeLinkStyle = {},
  isActive = false,
  goToLink = () => {},
  children,
}
 * @returns {ReactElement}
 */
export function ActivableLink({
  item,
  activeLinkStyle = {},
  isActive = false,
  goToLink = () => {},
  children,
}: ActivableLinkProps): ReactElement {
  const [expanded, setExpanded] = useState(true);

  const styles = isActive ? activeLinkStyle : {};
  const classes = `relative block text-gray-500 cursor-pointer ${
    isActive ? "activable-link" : ""
  }`;

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
