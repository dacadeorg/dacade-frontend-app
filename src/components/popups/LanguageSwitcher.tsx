import { ReactElement, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import ArrowDown from "@/assets/arrow-down.svg";
import DropdownPopup from "@/components/ui/DropdownPopup";
import LanguageList from "@/components/list/LanguageList";
import useOnClickOutside from "use-onclickoutside";

/**
 * Language Switcher Interface
 * @date 3/29/2023 - 12:18:26 PM
 * @interface LanguageSwitcherProps
 * @typedef {LanguageSwitcherProps}
 * @param {Function} close
 * @returns {ReactElement}
 *
 * */

interface LanguageSwitcherProps {
  close?: () => void;
}

/**
 * Language Switcher Component
 * @date 3/29/2023 - 12:17:37 PM
 * @export
 * @param {LanguageSwitcherProps} {
 *  close,
 * }
 * @returns {ReactElement}
 *
 * */

export default function LanguageSwitcher({
  close,
}: LanguageSwitcherProps): ReactElement {
  const [show, setshow] = useState(false);

  const popupRef = useRef<HTMLDivElement>(null);

  const toggle = () => {
    setshow((prev) => !prev);
    //TODO;  will be added when redux is added to the project
    // dispatch("ui/toggleBodyScrolling", show);
  };

  const toggleInvite = () => {
    //TODO; will be added when redux is added to the project
    // store.dispatch("ui/toggleShowReferralPopup", true);
  };

  const externalClick = () => {
    if (show) {
      setshow(false);
      //TODO; will be added when redux is added to the project
      // dispatch("ui/toggleBodyScrolling", show);
    }
  };

  useOnClickOutside(popupRef, externalClick);

  const { i18n } = useTranslation();

  const currentLocale = useMemo(() => i18n.language, [i18n.language]);
  return (
    <>
      <div>
        <div
          ref={popupRef}
          className="inline-block opacity-70 hover:opacity-100 text-sm ml-3 cursor-pointer"
        >
          <span className="inline-block uppercase">
            {currentLocale}
          </span>
          <span className="inline-block">
            <ArrowDown />
          </span>
        </div>
        {show && (
          <>
            <DropdownPopup onClose={toggle}>
              <LanguageList />
            </DropdownPopup>

            <div className="opacity-25 fixed inset-0 z-30 bg-black" />
          </>
        )}
      </div>
    </>
  );
}
