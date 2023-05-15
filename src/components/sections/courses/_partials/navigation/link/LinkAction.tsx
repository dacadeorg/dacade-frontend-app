import classNames from "classnames";
import Link from "next/link";
import { ReactElement } from "react";

/**
 * Interface for Action Link
 * @date 4/19/2023 - 7:01:17 PM
 *
 * @interface LinkActionProps
 * @typedef {LinkActionProps}
 */
interface LinkActionProps {
  item: any;
  activeLinkStyle: any;
  isActive: boolean;
  goToLink: () => void;
  children: React.ReactNode;
}

/**
 * Action Link component
 * @date 4/19/2023 - 7:01:38 PM
 *
 * @export
 * @param {LinkActionProps} {
  item,
  activeLinkStyle,
  isActive,
  goToLink,
  children,
}
 * @returns {ReactElement}
 */
export default function LinkAction({ item, activeLinkStyle, isActive, goToLink, children }: LinkActionProps): ReactElement {
  const classes = classNames("relative block text-gray-500 cursor-pointer", { "activable-link": isActive });

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
