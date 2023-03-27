import React, { useState, useEffect } from "react";
import hexToRgba from "hex-to-rgba";
import { useSelector, useDispatch } from "react-redux";
import Logo from "@/components/layout/Logo";
import Sidebar from "@/components/popups/Sidebar";
import NavItem from "@/components/ui/NavItem";
import NotificationPopup from "@/components/popups/Notification";
import UserPopup from "@/components/popups/user";
import Button from "@/components/ui/button";
import LanguageSwitcherPopup from "@/components/popups/LanguageSwitcher.tsx";

const Navbar = (props: any) => {
  const { settings, sidebarBurgerColor } = props;
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
  const user = useSelector((state: any) => state.user.get);
  const isAuthenticatedAndVerified = useSelector(
    (state: any) => state.auth.isVerified
  );
  const isAuthenticated = useSelector(
    (state: any) => state.auth.check
  );
  const dispatch = useDispatch();

  const logOut = () => {
    dispatch({ type: "auth/logout" });
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
      <div className="content-wrapper lg:py-12 py-6 flex relative">
        <ul className="relative">
          <NavItem type="logo" className="w-8 h-8 md:w-11 md:h-11">
            <Logo />
          </NavItem>
          <NavItem type="brand mx-0.5">{$t("app.name")}</NavItem>
        </ul>
        {isAuthenticatedAndVerified && (
          <ul className="hidden lg:block relative self-center">
            <NavItem to="/bounties">{$t("nav.bounties")}</NavItem>
            <NavItem to={localePath({ path: "/communities" })}>
              {$t("nav.communities")}
            </NavItem>
          </ul>
        )}
        <ul className="ml-auto text-right relative flex lg:hidden items-center">
          <Sidebar burgerColor={sidebarBurgerColor} />
        </ul>
        {!isAuthenticated && (
          <ul className="ml-auto text-right relative hidden lg:block">
            {$router.history.current.path !== "/login" && (
              <div className="inline-block">
                {$router.history.current.path === "/signup" && (
                  <span className="text-sm">
                    {$t("nav.signup.already-exist")}
                  </span>
                )}
                <NavItem to="/login">
                  <span
                    className={
                      $router.history.current.path === "/signup"
                        ? "py-2 text-sm text-primary"
                        : "py-2 text-sm inherit"
                    }
                  >
                    {$t("nav.login")}
                  </span>
                </NavItem>
              </div>
            )}
            {$router.history.current.path !== "/signup" && (
              <div className="inline-block">
                {$router.history.current.path === "/login" && (
                  <span className="text-sm">
                    {$t("nav.signin.new-accout")}
                  </span>
                )}
                <NavItem to="/signup">
                  {$router.history.current.path === "/login" ? (
                    <span className="py-2 text-sm text-primary">
                      {$t("nav.sign-up")}
                    </span>
                  ) : (
                    <Button
                      type="secondary"
                      padding={false}
                      className={
                        $router.history.current.path === "/login"
                          ? "text-sm py-2 text-primary"
                          : "text-sm py-2 text-gray-900"
                      }
                    >
                      {$t("nav.sign-up")}
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
};

export default Navbar;
