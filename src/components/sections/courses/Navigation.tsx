import { useTranslation } from "next-i18next";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import { useSelector } from "@/hooks/useTypedSelector";
import LanguageSwitcher from "./_partials/LanguageSwitcher";
import CourseLink from "./_partials/navigation/link/CourseLink";
import { useEffect, useState } from "react";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { initNavigationMenu } from "@/store/feature/communities/navigation.slice";
import { List } from "@/utilities/CommunityNavigation";

/**
 * Navigation component
 * @date 4/18/2023 - 12:23:40 PM
 *
 * @export
 * @returns {*}
 */
export default function Navigation() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [menus, setMenus] = useState<List[]>([]);

  const community = useSelector(
    (state) => state.communities?.current
  );

  useEffect(() => {
    setMenus(initNavigationMenu()(dispatch));
  }, [dispatch]);

  return community ? (
    <ThemeWrapper colors={community.colors}>
      <ul className="relative">
        {menus.length ? (
          menus.map((menu, index) => {
            return (
              <li key={`menu-${index}`} className="relative mb-8">
                {!menu.hideTitle && (
                  <span className="relative text-xs font-semibold uppercase">
                    {t(menu.title)}
                  </span>
                )}
                <ul>
                  {menu.items.length ? (
                    menu.items.map((item, index: number) => {
                      return (
                        <li
                          key={`menu-item-${index}`}
                          className="relative mt-4"
                        >
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
  ) : (
    <></>
  );
}
