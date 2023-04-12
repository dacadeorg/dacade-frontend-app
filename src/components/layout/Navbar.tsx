import React, { useState, useEffect, ReactElement } from "react";
import hexToRgba from "hex-to-rgba";
import Logo from "@/icons/logo.svg";
// import Sidebar from "@/components/popups/Sidebar";
import NavItem from "@/components/ui/NavItem";
import NotificationPopup from "@/components/popups/NotificationPopup";
import UserPopup from "@/components/popups/user";
import Button from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import LanguageSwitcherPopup from "@/components/popups/LanguageSwitcher";
import {
  authCheck,
  authVerify,
  logout,
} from "@/store/feature/auth.slice";
import LanguageList from "../list/LanguageList";

/**
 * Navbar Interface
 * @date 4/12/2023 - 10:21:45 AM
 *
 * @interface NavbarProps
 * @typedef {NavbarProps}
 */
interface NavbarProps {
  settings: any;
  sidebarBurgerColor: string;
}

/**
 * Navbar Component
 * @date 4/12/2023 - 10:21:55 AM
 *
 * @export
 * @param {NavbarProps} {
  settings,
  sidebarBurgerColor,
}
 * @returns {ReactElement}
 */
export default function Navbar({
  settings,
  sidebarBurgerColor,
}: NavbarProps): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  const containerStyle = {
    backgroundColor: settings.colors.primary,
    color: settings.colors.text,
  };
  const buttonStyle = {
    backgroundColor: hexToRgba(settings.colors.text, 0.3),
    color: settings.colors.text,
  };

  const badgeStyle = {
    backgroundColor: settings.colors.accent,
    color: settings.colors.primary,
  };

  const user = useSelector((state) => state.user.data);
  const isAuthenticatedAndVerified = useSelector((state) =>
    authVerify(state)
  );
  const isAuthenticated = useSelector(authCheck);

  const onLogOut = () => {
    dispatch(logout());
  };

  const getSectionName = (route: any) => {
    switch (route.name) {
      case "notifications":
        return "Notifications";
      case "communities":
        return "Communities";
      case "bounties":
        return "Bounties";
      case "profile":
        return "Profile";
      default:
        return null;
    }
  };

  return (
    <div className="text-gray-900" style={containerStyle}>
      <div className="lg:py-12 py-6 flex relative">
        <ul className="relative">
          <NavItem to="/" type="logo">
            <span>
              <Logo className="w-8 h-8 md:w-11 md:h-11" />
            </span>
          </NavItem>
          <NavItem to="/" type="brand">
            <span className="mx-1 font-black">{t("app.name")}</span>
          </NavItem>
        </ul>
        {isAuthenticatedAndVerified && (
          <ul className="hidden lg:block relative self-center">
            <NavItem type="item" to="/bounties">
              {t("nav.bounties")}
            </NavItem>
            <NavItem type="item" to={"/communities"}>
              {t("nav.communities")}
            </NavItem>
          </ul>
        )}
        <ul className="ml-auto text-right relative flex lg:hidden items-center">
          {/* TODO: waiting the side bar to be implemented */}
          {/* <Sidebar burgerColor={sidebarBurgerColor} /> */}
        </ul>
        {!isAuthenticated && (
          <ul className="ml-auto text-right relative hidden lg:block">
            {router.pathname !== "/login" && (
              <div className="inline-block">
                {router.pathname === "/signup" && (
                  <span className="text-sm">
                    {t("nav.signup.already-exist")}
                  </span>
                )}
                <NavItem type="item" to="/login">
                  <span
                    className={
                      router.pathname === "/signup"
                        ? "py-2 text-sm text-primary"
                        : "py-2 text-sm inherit"
                    }
                  >
                    {t("nav.login")}
                  </span>
                </NavItem>
              </div>
            )}
            {router.pathname !== "/signup" && (
              <div className="inline-block">
                {router.pathname === "/login" && (
                  <span className="text-sm">
                    {t("nav.signin.new-accout")}
                  </span>
                )}
                <NavItem type="item" to="/signup">
                  {router.pathname === "/login" ? (
                    <span className="py-2 text-sm text-primary">
                      {t("nav.sign-up")}
                    </span>
                  ) : (
                    <Button
                      variant="secondary"
                      padding={false}
                      loading={false}
                      disabled={false}
                      type="button"
                      rounded={false}
                      onClick={() => {}}
                      className={
                        router.pathname === "/login"
                          ? "text-sm py-2 text-primary"
                          : "text-sm py-2 text-gray-900"
                      }
                    >
                      {t("nav.sign-up")}
                    </Button>
                  )}
                </NavItem>
              </div>
            )}
            <div className="inline-block">
              <LanguageSwitcherPopup />
            </div>
          </ul>
        )}
        {isAuthenticated && (
          <ul className="hidden lg:flex ml-auto text-right relative">
            <NotificationPopup
              buttonStyles={buttonStyle}
              badgeStyles={badgeStyle}
            />
            <UserPopup buttonStyles={buttonStyle} />
          </ul>
        )}
      </div>
    </div>
  );
}
