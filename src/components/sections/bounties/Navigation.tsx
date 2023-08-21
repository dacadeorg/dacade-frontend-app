import UniqBy from "lodash.uniqby";
import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import ChevronRightIcon from "@/icons/chevron-right.svg";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement, useMemo } from "react";
import { List } from "@/utilities/CommunityNavigation";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";

/**
 * Bounties Navigation component
 * @date 5/2/2023 - 1:41:29 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function BountiesNavigation(): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
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
        title: t("bounties.navigation"),
        items: [
          {
            label: t("bounties.navigation.all"),
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
    [bounties, t]
  );

  return (
    <ThemeWrapper colors={colors}>
      <ul className="sticky top-10">
        {menus.map((menu, i) => (
          <li key={`bounties-menu-${i}`} className="relative mb-8">
            {!menu.hideTitle && <span className="relative text-xs font-semibold uppercase">{menu.title}</span>}
            <ul>
              {menu.items.map((item, k) => (
                <li key={`bounties-menu-item-${k}`} className="relative mt-4 text-sm text-blue-600">
                  <Link
                    href={item.link}
                    className={classNames("relative text-gray-500", {
                      "activable-link": !item.exact,
                      "!text-blue-600": router.query.slug === item.link.split("/")[2],
                    })}
                  >
                    <span className="absolute inline-block -left-6 nav-icon">{router.query.slug === item.link.split("/")[2] && <ChevronRightIcon />}</span>
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </ThemeWrapper>
  );
}
