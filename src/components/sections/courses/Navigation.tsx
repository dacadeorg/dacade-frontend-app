import SideNavigation from "@/components/ui/SideNavigation";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react";
import LanguageSwitcher from "./_partials/LanguageSwitcher";
import { IRootState } from "@/store";
import { Community } from "@/types/community";
import { Items } from "@/store/feature/communities/navigation.slice";

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
  // const { community, menus } = useSelector((state) => ({
  //   community: state.communities?.current,
  //   menus: state.navigation.menus,
  // }));
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
