import classNames from "classnames";
import { ReactElement } from "react";

/**
 * Popups interface props
 * @date 4/12/2023 - 12:59:58 PM
 *
 * @interface PopupProps
 * @typedef {PopupProps}
 */
interface PopupProps {
  center?: boolean;
  onClose?: () => void;
  show?: boolean;
  children?: React.ReactNode;
  className?: string;
}

/**
 * Popup component
 * @date 4/12/2023 - 1:00:31 PM
 *
 * @export
 * @param {PopupProps} {
  center,
  onClose,
  show,
  children,
  className = "",
}
 * @returns {ReactElement}
 */
export default function Popup({ center, onClose, show, children, className = "" }: PopupProps): ReactElement {
  return show ? (
    <div className={classNames(`fixed z-999 w-screen h-screen overflow-y-scroll top-0 left-0 ${className}`, { "flex items-center": center })}>
      <div className="opacity-25 fixed inset-0 z-0 bg-black w-full h-screen top-0 left-0" onClick={onClose} />
      {children}
    </div>
  ) : (
    <> </>
  );
}
