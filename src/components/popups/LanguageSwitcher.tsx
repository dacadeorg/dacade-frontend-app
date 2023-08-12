import { ReactElement, useMemo, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import ChevronBottom from "@/icons/down-icon-arrow.svg";
import DropdownPopup from "@/components/ui/DropdownPopup";
import LanguageList from "@/components/list/LanguageList";
import useOnClickOutside from "use-onclickoutside";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";

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

export default function LanguageSwitcher(): ReactElement {
  const [show, setshow] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();

  const { i18n } = useTranslation();
  const currentLocale = useMemo(() => i18n.language, [i18n.language]);

  const toggle = () => {
    setshow((prev) => !prev);
    toggleBodyScrolling(!show)(dispatch);
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
        <div onClick={toggle} className="inline-block opacity-70 hover:opacity-100 text-sm ml-3 cursor-pointer">
          <span className="inline-block uppercase mr-1">{currentLocale}</span>
          <span className="inline-block">
            <ChevronBottom />
          </span>
        </div>
        {show && (
          <>
            <DropdownPopup onClose={externalClick}>
              <LanguageList onSelect={externalClick} />
            </DropdownPopup>

            <div className="opacity-25 fixed inset-0 z-30 bg-black" />
          </>
        )}
      </div>
    </>
  );
}
