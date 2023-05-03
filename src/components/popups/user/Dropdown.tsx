import { CSSProperties, ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "@/hooks/useTypedSelector";
import BalanceList from "@/components/list/Balance";
import ReputationList from "@/components/list/Reputation";
import LanguageList from "@/components/list/LanguageList";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/button";
import DropdownPopup from "@/components/ui/DropdownPopup";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { User } from "@/types/bounty";
import { setShowReferralPopup } from "@/store/feature/ui.slice";
import { logout } from "@/store/feature/auth.slice";
import { setBusy, setError } from "@/store/feature/index.slice";

/**
 * User profile dropdown component
 * @date 4/4/2023 - 11:54:51 PM
 *
 * @param {{
  buttonStyles: CSSProperties;
}} {
  buttonStyles,
}
 * @returns {ReactElement}
 */
const UserProfileDropdown = ({ buttonStyles, close }: { buttonStyles?: CSSProperties; close?: () => void }): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState<boolean>(process.env.NEXT_PUBLIC_SHOW_LANGUAGE_SELECTOR === "true");

  const wallets = useSelector((state) => state.wallets.list);

  const reputations = useSelector((state) => state.reputations.list);

  const { busy, error } = useSelector((state) => state.store);

  const user = useSelector((state) => state.user.data);
  const username = user?.displayName;

  /**
   * Logout handler.
   * It executes the logout action then redirects the user back to the home page
   * @date 4/4/2023 - 11:55:42 PM
   */
  const onLogout = () => {
    logout();
    router.push("/");
  };

  /**
   * Tooggl Invite handler.
   * It dispatches the setShowReferralPopup action with true as value
   * to display the referral popup modal
   * @date 4/4/2023 - 11:56:40 PM
   */
  const toggleInvite = () => {
    dispatch(setShowReferralPopup(true));
  };

  useEffect(() => {
    const handleRouteChange = () => {
      if (busy || error) {
        dispatch(setBusy(false));
        dispatch(setError(null));
      }
    };

    handleRouteChange();
    return () => {
      window.removeEventListener("routechange", handleRouteChange);
    };
  }, [busy, dispatch, error]);

  return (
    <DropdownPopup onClose={close}>
      <div className="divide-y divide-gray-200">
        <div className="flex justify-between hover:bg-gray-50">
          <div className="w-full p-4 text-left flex">
            <div className="pr-3.5">
              <Avatar user={user as User} size="medium" useLink={false} />
            </div>
            <div className="pt-2">
              <span className="font-medium text-base block leading-normal capitalize">{username}</span>
              <a className="self-end text-sm block leading-normal" href="/profile">
                {t("nav.view-profile")}
              </a>
            </div>
          </div>
          <div className="mr-4 mb-6 text-gray-500 self-end text-right whitespace-nowrap align-text-bottom font-normal cursor-pointer text-sm" onClick={onLogout}>
            <span>{t("nav.sign-out")}</span>
          </div>
        </div>
        {wallets.length && (
          <div className="p-4">
            <BalanceList />
          </div>
        )}
        {reputations.length && (
          <div className="p-4">
            <ReputationList />
          </div>
        )}
        {showLanguageSwitcher && <LanguageList />}
        <div className="p-4 flex justify-center bg-indigo-50">
          <div className="z-10">
            <Button
              type="button"
              padding={false}
              variant="outline-primary"
              className="flex btn-primary btn-lg py-2 px-5 align-middle text-sm"
              onClick={toggleInvite}
              customStyle={buttonStyles}
            >
              {t("nav.view-profile-codes")}
            </Button>
          </div>
        </div>
      </div>
    </DropdownPopup>
  );
};

export default UserProfileDropdown;
