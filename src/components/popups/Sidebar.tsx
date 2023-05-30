import Link from "next/link";
import { useState } from "react";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import CloseIcon from "@/icons/close-top-right.svg";
import MobileMenuLogo from "@/icons/menu.svg";
import BountiesIcon from "@/icons/bounties.svg";
import CommunitiesIcon from "@/icons/communities.svg";
import WalletIcon from "@/icons/wallet.svg";
import Popup from "@/components/ui/Popup";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { toggleBodyScrolling, toggleShowReferralPopup } from "@/store/feature/ui.slice";
import { logout } from "@/store/feature/auth.slice";
import { authVerify } from "@/store/feature/auth.slice";
import { readNotification } from "@/store/services/notification.service";
import NotificationList from "../list/NotificationList";

/**
 * Sidebar props interface
 * @date 4/4/2023 - 3:49:01 PM
 *
 * @interface SidebarProps
 * @typedef {SidebarProps}
 */
interface SidebarProps {
  burgerColor?: boolean;
}

/**
 * Sidebar Component
 * @date 4/4/2023 - 3:49:20 PM
 *
 * @export
 * @param {SidebarProps} { burgerColor }
 * @returns {*}
 */
export default function Sidebar({ burgerColor = false }: SidebarProps): any {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { user, isAuthenticated, unread } = useSelector((state) => ({
    user: state.user.data,
    isAuthenticated: authVerify(state),
    unread: state.notifications.unread,
  }));

  const username = user?.username;

  const [show, setshow] = useState(false);

  const onLogout = () => {
    dispatch(logout());
  };

  const displayInvitationPopup = () => {
    setshow(!show);
    toggleShowReferralPopup(true)(dispatch);
  };

  const externalClick = () => {
    if (show) return;

    setshow(!show);
    toggleBodyScrolling(false)(dispatch);
  };

  const toggle = () => {
    setshow(!show);

    if (isAuthenticated && show && unread) {
      dispatch(readNotification());
    }
    toggleBodyScrolling(show)(dispatch);
    window.scrollTo(0, 0);
  };

  return (
    <div className="relative">
      <li className="inline-block align-middle z-40 relative ease-linear transition-all duration-150" onClick={toggle}>
        {!show ? (
          <div>
            <MobileMenuLogo className={burgerColor ? "text-white" : "text-black"} />
          </div>
        ) : (
          <div>
            <CloseIcon />
          </div>
        )}
      </li>
      <Popup center={false} show={show} className="px-3 pt-16 pb-2" onClose={externalClick}>
        <div className="max-h-full overflow-scroll md:max-w-sidebar relative ml-auto mt-0 md:mr-12 w-full z-40 bg-secondary rounded-3.5xl text-gray-900">
          <div className="divide-y divide-gray-200">
            <div className="flex flex-col text-left justify-between">
              <div className="flex">
                <div className="w-10 h-10 ml-3 mr-2 my-3 rounded-full bg-green-500">
                  <BountiesIcon className="m-2" />
                </div>
                <div className="py-5 font-medium text-gray-900" onClick={toggle}>
                  <Link className="font-medium text-lg text-gray-900" href="/bounties">
                    {t("nav.bounties")}
                  </Link>
                </div>
              </div>
              <div className="flex">
                <div className="w-10 h-10 ml-3 mr-2 my-3 rounded-full bg-purple-500">
                  <CommunitiesIcon className="m-2" />
                </div>
                <div className="py-5 font-medium text-gray-900" onClick={toggle}>
                  <Link className="font-medium text-lg text-gray-900" href="/communities">
                    {t("nav.communities")}
                  </Link>
                </div>
              </div>
              {isAuthenticated && (
                <div className="flex">
                  <div className="w-10 h-10 ml-3 mr-2 my-3 rounded-full bg-red-500">
                    <WalletIcon className="m-2" />
                  </div>
                  <div className="py-5 font-medium text-gray-900" onClick={toggle}>
                    <Link className="font-medium text-lg text-gray-900" href="/profile/wallets">
                      {t("nav.wallet")}
                    </Link>
                  </div>
                </div>
              )}

              {isAuthenticated && (
                <div className="w-full px-3 py-3 text-left flex justify-between">
                  <div onClick={toggle}>
                    <Link className="flex text-sm leading-normal" href="/profile">
                      <Avatar user={user} useLink={false} hideVerificationBadge />
                      <div className="py-2 px-2">
                        <span className="font-medium text-lg block leading-normal capitalize">{username}</span>
                      </div>
                    </Link>
                  </div>
                  <div className="py-2 self-end text-right whitespace-nowrap align-text-bottom font-normal text-sm text-gray-500 cursor-pointer" onClick={onLogout}>
                    <span>{t("nav.sign-out")}</span>
                  </div>
                </div>
              )}
            </div>
            {isAuthenticated && (
              <div className="p-4 flex justify-center bg-indigo-50">
                <div className="z-10">
                  <Button
                    type="button"
                    padding={false}
                    variant="outline-primary"
                    className="flex btn-primary btn-lg py-2 px-5 align-middle text-sm"
                    onClick={displayInvitationPopup}
                  >
                    {t("nav.view-profile-codes")}
                  </Button>
                </div>
              </div>
            )}
            {isAuthenticated && (
              <div className="px-5 py-2 relative">
                {/* TODO: Will be uncommented when the component is implemented */}
                <NotificationList extended={false} />
              </div>
            )}

            {!isAuthenticated && (
              <div className="w-full h-15 p-2 flex">
                <Button padding={false} type="button" variant="secondary" className="w-full p-3 text-sm font-medium text-primary" onClick={toggle}>
                  <Link className="w-full" href="/login">
                    {t("nav.login")}
                  </Link>
                </Button>

                <Button variant="primary" type="button" padding={false} className="w-full p-3 text-sm font-medium" onClick={toggle}>
                  <Link className="w-full" href="/signup">
                    {t("nav.sign-up")}
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </Popup>
    </div>
  );
}
