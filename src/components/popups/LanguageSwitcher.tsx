import { ReactElement, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import ChevronBottom from "@/icons/chevron-bottom.svg";
import DropdownPopup from "@/components/ui/DropdownPopup";
import LanguageList from "@/components/list/LanguageList";
import useOnClickOutside from "use-onclickoutside";
import { useDispatch } from "@/hooks/useTypedDispatch";
import {
  toggleBodyScrolling,
  toggleShowReferralPopup,
} from "@/store/feature/ui.slice";

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
  const dispatch = useDispatch();

  const { i18n } = useTranslation();
  const currentLocale = useMemo(() => i18n.language, [i18n.language]);

  const toggle = () => {
    setshow((prev) => !prev);
    toggleBodyScrolling(!show)(dispatch);
  };

  const toggleInvite = () => {
    close?.();
    toggleShowReferralPopup(true)(dispatch);
  };

  const externalClick = () => {
    if (show) {
      setshow(false);
      toggleBodyScrolling(false)(dispatch);
    }
  };
  useOnClickOutside(popupRef, externalClick);

  return (
    <>
      <div ref={popupRef}>
        <div
          onClick={toggle}
          className="flex opacity-70 hover:opacity-100 text-sm ml-3 cursor-pointer items-center"
        >
          <span className="uppercase">{currentLocale}</span>
          <span>
            <ChevronBottom className="w-4 mx-1" />
          </span>
        </div>
        {show && (
          <>
            <DropdownPopup onClose={externalClick}>
              <LanguageList />
            </DropdownPopup>

            <div className="opacity-25 fixed inset-0 z-30 bg-black" />
          </>
        )}
      </div>
    </>
  );
}
