import classNames from "classnames";
import Link from "next/link";
import { CSSProperties, ReactElement, ReactNode } from "react";

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
  activeLinkStyle?: CSSProperties;
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
export function ActivableLink({ item, activeLinkStyle, isActive = false, goToLink = () => {}, children }: ActivableLinkProps): ReactElement {
  const styles = isActive ? activeLinkStyle : {};
  const classes = classNames("relative block text-gray-500 cursor-pointer", { "activable-link": isActive });

  return (
    <span data-testid="activableLinkId" className="relative block">
      {item.subitems && item.subitems.length ? (
        <span className={classes} style={styles} onClick={goToLink}>
          {children}
        </span>
      ) : (
        <Link data-testid="linkId" className={classes} style={styles} href={item.link}>
          {children}
        </Link>
      )}
    </span>
  );
}
