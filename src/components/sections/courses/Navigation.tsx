import React from "react";
import { useTranslation } from "next-i18next";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import { useSelector } from "@/hooks/useTypedSelector";
import NavigationLink from "./_partials/navigation/link";
import LanguageSwitcher from "./_partials/LanguageSwitcher";

/**
 * Navigation component
 * @date 4/18/2023 - 12:23:40 PM
 *
 * @export
 * @returns {*}
 */
export default function Navigation() {
  const { t } = useTranslation();

  const community = useSelector((state) => state.communities.current);

  const menus = useSelector((state) => state.courses.menus);

  return community ? (
    <ThemeWrapper colors={community.colors}>
      <ul className="relative">
        {menus.length &&
          menus.map((menu, index) => {
            return (
              <li key={index} className="relative mb-8">
                {!menu.hideTitle && (
                  <span className="relative text-xs font-semibold uppercase">
                    {t(menu.title)}
                  </span>
                )}
                <ul>
                  {menu.items.length
                    ? menu.items.map((item, index) => {
                        return (
                          <li key={index} className="relative mt-4">
                            <NavigationLink item={item} />
                          </li>
                        );
                      })
                    : null}
                </ul>
              </li>
            );
          })}
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </ThemeWrapper>
  ) : null;
}
