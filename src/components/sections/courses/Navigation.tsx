import SideNavigation from "@/components/ui/SideNavigation";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import LanguageSwitcher from "./_partials/LanguageSwitcher";
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

  const { community, menus } = useSelector((state) => ({
    community: state.communities?.current,
    menus: state.navigation.menus,
  }));

  console.log(menus);

  if (community)
    return (
      <SideNavigation items={menus} colors={community.colors}>
        <li>
          <LanguageSwitcher />
        </li>
      </SideNavigation>
    );
  return <></>;
}
