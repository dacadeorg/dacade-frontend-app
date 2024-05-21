import { CSSProperties, ReactElement, useEffect, useMemo } from "react";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import BalanceList from "@/components/list/Balance";
import ReputationList from "@/components/list/Reputation";
import LanguageList from "@/components/list/LanguageList";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/button";
import DropdownPopup from "@/components/ui/DropdownPopup";
import { useTranslation } from "next-i18next";
import { Reputation, User } from "@/types/bounty";
import { setShowReferralPopup, toggleBodyScrolling } from "@/store/feature/ui.slice";
import { logout } from "@/store/feature/auth.slice";
import { setBusy, setError } from "@/store/feature/index.slice";
import Link from "next/link";
import { useDispatch } from "@/hooks/useTypedDispatch";
import VerifiedIcon from "@/icons/verified.svg";
import { IRootState } from "@/store";
import { Wallet } from "@/types/wallet";
import { KYCSTATUS } from "@/store/feature/kyc.slice";

/**
 * interface for UserProfileDropdown multiSelector
 * @date 9/12/2023 - 4:02:26 PM
 *
 * @interface UserProfileDropdownMultiSelector
 * @typedef {UserProfileDropdownMultiSelector}
 */
interface UserProfileDropdownMultiSelector {
  wallets: Wallet[];
  reputations: Reputation[];
  user: User | null;
  error: any;
  busy: boolean;
}

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
const UserProfileDropdown = ({ buttonStyles, onClose }: { buttonStyles?: CSSProperties; onClose: () => void }): ReactElement => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const showLanguageSwitcher = useMemo(() => process.env.NEXT_PUBLIC_SHOW_LANGUAGE_SELECTOR === "true", []);
  const { wallets, reputations, user, error, busy } = useMultiSelector<unknown, UserProfileDropdownMultiSelector>({
    wallets: (state: IRootState) => state.wallets.list,
    reputations: (state: IRootState) => state.userReputations.list,
    user: (state: IRootState) => state.user.data,
    busy: (state: IRootState) => state.store.busy,
    error: (state: IRootState) => state.store.error,
  });
  const username = user?.displayName;
  const isKycVerified = useMemo(() => user?.kycStatus === KYCSTATUS.VERIFIED, [user]);

  /**
   * Logout handler.
   * It executes the logout action then redirects the user back to the home page
   * @date 4/4/2023 - 11:55:42 PM
   */
  const onLogout = () => {
    dispatch(logout());
    dispatch(toggleBodyScrolling(false));
  };

  /**
   * Toggle the Invite handler.
   * It dispatches the setShowReferralPopup action with true as value
   * to display the referral popup modal
   * @date 4/4/2023 - 11:56:40 PM
   */
  const displayInvitationPopup = () => {
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
    <DropdownPopup>
      <div className="divide-y divide-gray-200">
        <div className="flex justify-between hover:bg-gray-50">
          <div className="w-full p-4 text-left flex">
            <div className="pr-3.5">
              <Avatar user={user as User} size="medium" useLink={false} hideVerificationBadge />
            </div>
            <div className="pt-2">
              <div className="flex items-center space-x-1">
                <span className="font-medium text-base block leading-normal capitalize">{username}</span>
                <span className="block pt-0.5">{isKycVerified && <VerifiedIcon className="w-3.5 h-3.5" />}</span>
              </div>
              <Link className="self-end text-sm block leading-normal" href="/profile" onClick={onClose}>
                {t("nav.view-profile")}
              </Link>
            </div>
          </div>
          <div className="mr-4 mb-6 text-gray-500 self-end text-right whitespace-nowrap align-text-bottom font-normal cursor-pointer text-sm" onClick={onLogout}>
            <span>{t("nav.sign-out")}</span>
          </div>
        </div>
        {wallets.length ? (
          <div className="p-4">
            <BalanceList />
          </div>
        ) : (
          <></>
        )}
        {reputations.length ? (
          <div className="p-4">
            <ReputationList />
          </div>
        ) : (
          <></>
        )}
        {showLanguageSwitcher && <LanguageList onSelect={onClose} />}
        <div className="p-4 flex justify-center bg-indigo-50">
          <div className="z-10">
            <Button
              type="button"
              padding={false}
              variant="outline-primary"
              className="flex btn-primary btn-lg py-2 px-5 align-middle text-sm"
              onClick={displayInvitationPopup}
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
