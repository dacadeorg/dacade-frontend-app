import SideNavigation from "@/components/ui/SideNavigation";
import { useSelector } from "@/hooks/useTypedSelector";
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
  const { community, menus } = useSelector((state) => ({
    community: state.communities?.current,
    menus: state.navigation.menus,
  }));

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
