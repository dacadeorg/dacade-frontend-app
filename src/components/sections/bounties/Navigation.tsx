import UniqBy from "lodash.uniqby";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import ChevronRightIcon from "@/icons/chevron-right.svg";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement, useMemo } from "react";
import { List } from "@/utilities/CommunityNavigation";
import classNames from "classnames";

/**
 * Bounties Navigation component
 * @date 5/2/2023 - 1:41:29 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function BountiesNavigation(): ReactElement {
  const { colors, bounties } = useSelector((state) => ({
    colors: state.ui.colors,
    bounties: state.bounties.bountiesList,
  }));

  /**
   * Array of menu items for the bounties navigation.
   * @type {Omit<List, "id">[]}
   */
  const menus: Omit<List, "id">[] = useMemo(
    () => [
      {
        title: "bounties.navigation",
        items: [
          {
            label: "bounties.navigation.all",
            exact: true,
            link: "/bounties",
          },
          ...UniqBy(
            bounties.map((bounty) => {
              return {
                label: bounty.name,
                exact: true,
                link: `/bounties/${bounty.slug}`,
              };
            }),
            "link"
          ),
        ],
      },
    ],
    [bounties]
  );

  return (
    <ThemeWrapper colors={colors}>
      <ul className="sticky top-10">
        {menus.map((menu, i) => (
          <li key={`bounties-menu-${i}`} className="relative mb-8">
            {!menu.hideTitle && (
              <span className="relative text-xs font-semibold uppercase">
                {menu.title}
              </span>
            )}
            <ul>
              {menu.items.map((item, k) => (
                <li
                  key={`bounties-menu-item-${k}`}
                  className="relative mt-4 text-sm text-blue-600"
                >
                  <a
                    href={item.link}
                    className={classNames("relative text-gray-500", {
                      "activable-link": !item.exact,
                    })}
                  >
                    <span className="absolute inline-block -left-6 nav-icon">
                      <ChevronRightIcon />
                    </span>
                    <span className="nav-label">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </ThemeWrapper>
  );
}
