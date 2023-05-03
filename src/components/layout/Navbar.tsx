import { ReactElement, useMemo } from "react";
import hexToRgba from "hex-to-rgba";
import Logo from "@/icons/logo.svg";
import NavItem from "@/components/ui/NavItem";
import NotificationPopup from "@/components/popups/NotificationPopup";
import UserPopup from "@/components/popups/user";
import Button from "@/components/ui/button";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import LanguageSwitcherPopup from "@/components/popups/LanguageSwitcher";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import {
  authCheck,
  authVerify,
  logout,
} from "@/store/feature/auth.slice";
import Sidebar from "./Sidebar";
import { Colors } from "@/types/community";
import classNames from "classnames";

interface NavbarProps {
  settings: {
    colors: Colors;
  };
  sidebarBurgerColor: boolean;
}

export default function Navbar({
  settings,
  sidebarBurgerColor = false,
}: NavbarProps): ReactElement {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const isAuthenticatedAndVerified = useSelector((state) =>
    authVerify(state)
  );
  const isAuthenticated = useSelector(authCheck);

  const containerStyle = useMemo(() => {
    return {
      backgroundColor: settings.colors.primary,
      color: settings.colors.text,
    };
  }, [settings.colors.primary, settings.colors.text]);

  const buttonStyle = {
    backgroundColor: hexToRgba(settings.colors.text, 0.3),
    color: settings.colors.text,
  };

  const badgeStyle = {
    backgroundColor: settings.colors.accent,
    color: settings.colors.primary,
  };

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
    <div className="text-gray-900 " style={containerStyle}>
      <div className="content-wrapper lg:py-12 py-6 flex relative">
        <ul className="relative">
          <NavItem to="/" type="logo w-8 h-8 md:w-11 md:h-11">
            <Logo />
          </NavItem>
          <NavItem to="/" type="brand mx-0.5">
            {t("app.name")}
          </NavItem>
        </ul>
        {isAuthenticatedAndVerified && (
          <ul className="hidden lg:block relative self-center">
            <NavItem to="/bounties">{t("nav.bounties")}</NavItem>
            <NavItem to={"/communities"}>
              {t("nav.communities")}
            </NavItem>
          </ul>
        )}
        <ul className="ml-auto text-right relative flex lg:hidden items-center">
          <Sidebar burgerColor={sidebarBurgerColor} />
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
                    className={classNames("py-2 text-sm", {
                      "text-primary": router.pathname === "/signup",
                      inherit: router.pathname !== "/signup",
                    })}
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
                      onClick={() => null}
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
