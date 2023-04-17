import React from "react";
import { useTranslation } from "next-i18next";
import LanguageSwitcher from "@/components/popups/LanguageSwitcher";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import { useSelector } from "@/hooks/useTypedSelector";
import NavigationLink from "./_partials/navigation/link";

export default function Navigation() {
  const { t } = useTranslation();

  const community = useSelector((state) => state.communities.current);

  const menus = useSelector((state) => state.menus);

  return (
    <ThemeWrapper colors={community.colors}>
      <ul className="relative">
        {menus.map((menu, index) => {
          return (
            <li key={index} className="relative mb-8">
              {!menu.hideTitle && (
                <span className="relative text-xs font-semibold uppercase">
                  {t(menu.title)}
                </span>
              )}
              <ul>
                {menu.items.map((item, index) => {
                  return (
                    <li key={index} className="relative mt-4">
                      <NavigationLink item={item} />
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </ThemeWrapper>
  );
}
