import classNames from "classnames";
import Link from "next/link";
import React from "react";
import { useTranslation } from "next-i18next";

interface SubLinkProps {
  activeLinkStyle: any;
  item: any;
  subitem: any;
}

export default function SubLink({
  activeLinkStyle,
  item,
  subitem,
}: SubLinkProps) {
  const { t } = useTranslation();
  return (
    <li
      className="relative mt-4 text-sm text-gray-500"
      style={activeLinkStyle}
    >
      <Link
        href={{ pathname: item.link, hash: subitem.link }}
        className={classNames(
          "relative text-gray-500 opacity-50 hover:opacity-100",
          { "activable-link": !subitem.exact }
        )}
      >
        <span className="nav-label">{t(subitem.label)}</span>
      </Link>
    </li>
  );
}
