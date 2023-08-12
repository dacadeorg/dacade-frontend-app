import Link from "next/link";
import { CSSProperties, ReactElement } from "react";
import { Item } from "./LinkAction";

/**
 * SubLink props interface
 * @date 4/17/2023 - 12:56:06 PM
 *
 * @interface subLinkProps
 * @typedef {subLinkProps}
 */
interface subLinkProps {
  item: Item;
  activeLinkStyle: CSSProperties;
  subitem: Partial<Item>;
}

/**
 * SubLink component
 * @date 4/17/2023 - 12:56:31 PM
 *
 * @export
 * @param {subLinkProps} {
  item,
  activeLinkStyle,
  subitem,
}
 * @returns {ReactElement}
 */
export default function SubLink({ item, activeLinkStyle, subitem }: subLinkProps): ReactElement {
  return (
    <li className="relative mt-4 text-sm text-gray-500" style={activeLinkStyle}>
      <Link href={{ pathname: item.link, hash: subitem.link }} className={`relative text-gray-500 opacity-50 hover:opacity-100 ${!subitem.exact ? "activable-link" : ""}`}>
        <span className="nav-label">{subitem.label}</span>
      </Link>
    </li>
  );
}
