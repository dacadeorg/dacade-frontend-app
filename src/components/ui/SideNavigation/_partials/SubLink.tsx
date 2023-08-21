import classNames from "classnames";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { CSSProperties, ReactElement } from "react";
import { Item } from "./LinkAction";
import { SubItem } from "@/store/feature/communities/navigation.slice";

/**
 * Interface for subLink
 * @date 4/19/2023 - 7:04:21 PM
 *
 * @interface SubLinkProps
 * @typedef {SubLinkProps}
 */
interface SubLinkProps {
  activeLinkStyle: CSSProperties;
  item: Item;
  subitem: SubItem;
}

/**
 * subLink component
 * @date 4/19/2023 - 7:05:09 PM
 *
 * @export
 * @param {SubLinkProps} {
  activeLinkStyle,
  item,
  subitem,
}
 * @returns {ReactElement}
 */
export default function SubLink({ activeLinkStyle, item, subitem }: SubLinkProps): ReactElement {
  const { t } = useTranslation();
  return (
    <li className="relative mt-4 text-sm text-gray-500" style={activeLinkStyle}>
      <Link href={{ pathname: item.link, hash: subitem.link }} className={classNames("relative text-gray-500 opacity-50 hover:opacity-100", { "activable-link": !subitem.exact })}>
        <span className="nav-label">{t(subitem.label)}</span>
      </Link>
    </li>
  );
}
