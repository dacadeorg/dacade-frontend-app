import { ReactElement, useRef } from "react";
import useOnClickOutside from "use-onclickoutside";

/**
 * Dropdown Popup Interface
 * @date 3/23/2023 - 6:26:00 PM
 *
 * @interface DropdownPopupProps
 * @typedef {DropdownPopupProps}
 */
interface DropdownPopupProps {
  onClose?: () => void;
  children?: React.ReactNode;
}

/**
 * Dropdown Popup Component
 * @date 2023-03-23
 * @returns {ReactElement}
 */
export default function DropdownPopup({ onClose, children }: DropdownPopupProps): ReactElement {
  const popupRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(popupRef, () => onClose);
  return (
    <div
      ref={popupRef}
      style={{
        width: "calc(100vw - 40px)",
        maxWidth: "340px",
        maxHeight: "calc(100vh - 100px)",
        overflow: "hidden scroll",
      }}
      className="absolute top-14 right-0 z-50 bg-white rounded-3.5xl no-scrollbar text-gray-900"
    >
      {children}
    </div>
  );
}
