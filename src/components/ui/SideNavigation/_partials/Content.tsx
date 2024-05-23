import ChevronRightIcon from "@/icons/chevron-right.svg";
import { ReactElement } from "react";
import { useTranslation } from "next-i18next";

/**
 * NavItem props
 * @date 4/17/2023 - 12:39:33 PM
 *
 * @interface NavItemProps
 * @typedef {NavItemProps}
 */
interface NavItemProps {
  item: {
    label: string;
    subitems?: any[];
  };
  isActive?: boolean;
  expanded?: boolean;
}

/**
 * NavItem component
 * @date 4/17/2023 - 12:39:14 PM
 *
 * @export
 * @param {NavItemProps} {
  item,
  isActive = false,
  expanded = false,
}
 * @returns {ReactElement}
 */
export function NavItem({ item, isActive = false, expanded = false }: NavItemProps): ReactElement {
  const { t } = useTranslation();
  return (
    <span data-testid="contentId">
      <span style={{ display: isActive ? "!inline-block" : "none" }} className="absolute top-0 inline-block -left-6 nav-icon">
        <ChevronRightIcon data-testid="contentIcon" className={`transition-transform duration-200 ${item.subitems && item.subitems.length && isActive && expanded ? "transform rotate-90" : ""}`} />
      </span>
      <span data-testid="contentLabel" className="nav-label">{t(item.label)}</span>
    </span>
  );
}
