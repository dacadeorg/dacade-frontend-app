import { useMemo, ReactElement } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import { useRouter } from "next/router";

import ChevronRightIcon from "@/icons/chevron-right.svg";
import ProfileOverviewSection from "@/components/sections/profile/overview/Section";
import Link from "next/link";

interface MenuItem {
  label: string;
  link: string;
  exact?: boolean;
}

interface Menu {
  title: string;
  items: MenuItem[];
}

/**
 * Profile navigation component
 * @date 5/12/2023 - 4:12:59 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function ProfileNagivation(): ReactElement {
  const router = useRouter();
  const { communities, authUser } = useSelector((state) => ({
    communities: state.profile.communities.list,
    authUser: state.user.data,
  }));

  const username = router.asPath.split("/")[2] || authUser?.displayName;
  const isCurrentUser = username?.toLowerCase() === authUser?.displayName?.toLowerCase();

  const menus: Menu[] = useMemo(() => {
    const items: Menu[] = [];
    if (communities?.length) {
      menus.push({
        title: "Communities",
        items: communities.map((community) => ({
          label: community.name,
          link: `/profile/${username}/communities/${community.slug}`,
        })),
      });
    }

    const mainItems: MenuItem[] = [];
    if (isCurrentUser) {
      mainItems.push(
        {
          label: "Overview",
          link: username ? `/profile/${username}` : "/profile",
          exact: true,
        },
        {
          label: "Wallets",
          link: "/profile/wallets",
        },
        {
          label: "Referrals",
          link: "/profile/referrals",
        }
      );
    } else {
      mainItems.push({
        label: "Overview",
        link: `/profile/${username}`,
        exact: true,
      });
    }
    items.push({ title: "Profile", items: mainItems });
    return items;
  }, [communities, isCurrentUser, username]);

  const isCurrentMenuItem = (item: MenuItem) => item.link === router.asPath || (router.asPath === "/profile" && item.label.toLocaleLowerCase() === "overview");

  return (
    <ul className="relative hidden lg:block xl:block">
      {menus.map((menu, i) => (
        <li key={`profile-menu-${i}`} className="mb-8 relative">
          <ProfileOverviewSection title={menu.title}>
            <ul className="space-y-4 flex flex-col">
              {menu.items.map((item, k) => (
                <li key={`profile-menu-subItem-${k}`} className="text-sm relative text-primary">
                  <Link href={item.link} className={`relative text-gray-500 ${isCurrentMenuItem(item) && "text-primary"}`}>
                    {isCurrentMenuItem(item) && (
                      <span className="inline-block absolute -left-6 nav-icon">
                        <ChevronRightIcon />
                      </span>
                    )}
                    <span className="nav-label">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </ProfileOverviewSection>
        </li>
      ))}
    </ul>
  );
}
