import { useDispatch } from "react-redux";
import { useSelector } from "@/hooks/useTypedSelector";
import CloseIcon from "@/icons/close-icon.svg";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { ReactElement, useEffect } from "react";
import { checkCookiePolicy, acceptCookiePolicy } from "@/store/feature/banner.slice";

/**
 * PrivacyPolicyBanner component.
 *
 * @returns {ReactElement} The rendered component.
 * @date 2023-03-27
 */

export default function PrivacyPolicyBanner(): ReactElement {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const showBanner = useSelector((state) => state.banner.showCookiePolicy);

  useEffect(() => {
    dispatch(checkCookiePolicy());
  }, [dispatch]);

  /**
   * Handles the user accepting the cookie policy.
   */

  const onAcceptCookiesPolicy = () => {
    dispatch(acceptCookiePolicy());
  };

  if (showBanner)
    return (
      <div className="fixed bottom-0 left-0 right-0 z-999 flex flex-row justify-center md:justify-between bg-brand">
        <div className="text-white py-8 text-center mx-auto lg:text-base text-sm md:text-lg justify-center md:max-w-none px-6">
          {t("signup-page.privacy.text")}{" "}
          <Link href="/privacy-policy" className="underline">
            {t("signup-page.privacy")}
          </Link>
        </div>
        <div className="flex absolute lg:relative lg:p-6 md:py-0 lg:justify-center right-0 top-0 lg:items-center items-center" onClick={onAcceptCookiesPolicy}>
          <div className="z-50 lg:h-8 h-7 lg:w-8 w-7 flex items-center text-white rounded-full lg:border-solid lg:border lg:border-white hover:bg-blue-700 bg-transparent cursor-pointer place-content-center">
            <CloseIcon />
          </div>
        </div>
      </div>
    );
  return <></>;
}
