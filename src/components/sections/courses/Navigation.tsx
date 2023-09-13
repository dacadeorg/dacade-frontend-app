import SideNavigation from "@/components/ui/SideNavigation";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react";
import LanguageSwitcher from "./_partials/LanguageSwitcher";
import { IRootState } from "@/store";
import { Community } from "@/types/community";
import { Items } from "@/store/feature/communities/navigation.slice";

/**
 * interface for Navigation multiSelector
 * @date 9/13/2023 - 9:10:06 AM
 *
 * @interface NavigationMultiSelector
 * @typedef {NavigationMultiSelector}
 */
interface NavigationMultiSelector {
  community: Community | null;
  menus: Items[];
}

/**
 * Navigation component
 * @date 4/18/2023 - 12:23:40 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Navigation(): ReactElement {
  const { community, menus } = useMultiSelector<unknown, NavigationMultiSelector>({
    community: (state: IRootState) => state.communities?.current,
    menus: (state: IRootState) => state.navigation.menus,
  });

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
