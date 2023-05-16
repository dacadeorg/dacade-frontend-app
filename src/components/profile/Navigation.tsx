import classNames from "classnames";
import ChevronRightIcon from "@/icons/chevron-right.svg";
import { useSelector } from "@/hooks/useTypedSelector";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useEffect, useMemo } from "react";

/**
 * Profile menu component
 * @returns {ReactElement}
 */
export default function ProfileMenu(): ReactElement {
  const { communities, authUser } = useSelector((state) => ({
    communities: state.communities.list,
    authUser: state.user.data,
  }));

  const router = useRouter();
  const username = router.asPath || authUser?.displayName;
  const isCurrentUser = username?.toLowerCase() === authUser?.displayName?.toLowerCase();

  const menus = useMemo(() => {
    if (communities?.length) {
      return [
        {
          title: "navigation.profile.communities",
          items: communities?.map((community) => ({
            label: community.name,
            link: `/profile/${username}/communities/${community.slug}`,
            exact: true,
          })),
        },
      ];
    } else {
      return [];
    }
  }, [communities, username]);

  const mainItems = useMemo(() => {
    const items = [];
    if (isCurrentUser) {
      items.push(
        {
          label: "navigation.profile.overview",
          link: router.asPath ? `/profile/${username}` : "/profile",
          exact: true,
        },
        {
          label: "navigation.profile.wallets",
          link: "/profile/wallets",
          exact: true,
        },
        {
          label: "navigation.profile.referrals",
          link: "/profile/referrals",
          exact: true,
        }
      );
    } else {
      items.push({
        label: "navigation.profile.overview",
        link: `/profile/${username}`,
        exact: true,
      });
    }
    return items;
  }, [isCurrentUser, router.asPath, username]);

  useEffect(() => {
    menus.push({
      title: "navigation.profile.title",
      items: mainItems,
    });
  }, [mainItems, menus]);

  const linkStyleClassName = (exact: boolean) => {
    return classNames("relative text-gray-500", {
      "nuxt-link-exact-active": exact,
      "activable-link nuxt-link-active": !exact,
    });
  };

  return (
    <ul className="relative hidden lg:block xl:block">
      {menus.map((menu, i) => (
        <li key={i} className="mb-8 relative">
          {/* TODO: Will be uncommented when the ProfileOverviewsection is migrated */}
          {/* <ProfileOverviewSection title={menu.title} className="pb-0"> */}
          <ul className="space-y-4 flex flex-col">
            {menu.items.map((item, k) => (
              <li key={`profile-menu-item-${k}`} className="text-sm relative text-primary">
                <Link href={item.link} className={linkStyleClassName(item.exact)}>
                  <span className="inline-block absolute -left-6 nav-icon">
                    <ChevronRightIcon />
                  </span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          {/* TODO: Will be uncommented when the ProfileOverviewsection is migrated */}
          {/* </ProfileOverviewSection> */}
        </li>
      ))}
    </ul>
  );
}
