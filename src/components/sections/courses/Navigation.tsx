import { useTranslation } from "next-i18next";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import { useSelector } from "@/hooks/useTypedSelector";
import LanguageSwitcher from "./_partials/LanguageSwitcher";
import CourseLink from "./_partials/navigation/link/CourseLink";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
/**
 * Navigation component
 * @date 4/18/2023 - 12:23:40 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Navigation(): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const community = useSelector((state) => state.communities?.current);

  const menus = useSelector((state) => state.navigation.menus);

  if (community)
    return (
      <ThemeWrapper colors={community.colors}>
        <ul className="relative">
          {menus.length ? (
            menus.map((menu, index) => {
              return (
                <li key={`menu-${index}`} className="relative mb-8">
                  {!menu.hideTitle && <span className="relative text-xs font-semibold uppercase">{t(menu.title)}</span>}
                  <ul>
                    {menu.items.length ? (
                      menu.items.map((item, index: number) => {
                        return (
                          <li key={`menu-item-${index}`} className="relative mt-4">
                            <CourseLink item={item} />
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
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </ThemeWrapper>
    );
  return <></>;
}
