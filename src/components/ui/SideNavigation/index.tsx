import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import { Colors } from "@/types/community";
import { useTranslation } from "next-i18next";
import { ReactElement, ReactNode } from "react";
import SideNavLink from "./_partials/SideNavLink";
import { Item } from "./_partials/LinkAction";
/**
 * Navigation component
 * @date 4/18/2023 - 12:23:40 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function SideNavigation({ items, colors, children }: { items: Item[]; colors: Colors; children: ReactNode }): ReactElement {
  const { t } = useTranslation();
  return (
    <ThemeWrapper colors={colors}>
      <ul className="relative">
        {items.length ? (
          items.map((menu, index) => {
            return (
              <li key={`menu-${index}`} className="relative mb-8">
                {!menu.hideTitle && <span className="relative text-xs font-semibold uppercase">{t(menu.title)}</span>}
                <ul>
                  {menu.items.length ? (
                    menu.items.map((item, index) => {
                      return (
                        <li key={`menu-item-${index}`} className="relative mt-4">
                          <SideNavLink item={item} />
                        </li>
                      );
                    })
                  ) : (
                    <></>
                  )}
                </ul>
              </li>
            );
          })
        ) : (
          <></>
        )}
        {children}
      </ul>
    </ThemeWrapper>
  );
}
