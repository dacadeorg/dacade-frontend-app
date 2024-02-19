import { ReactElement, ReactNode, useMemo } from "react";
import Popup from "./Popup";
import classNames from "classnames";

/**
 * Interface for modal props
 * @date 3/24/2023 - 6:37:31 PM
 *
 * @interface ModalProps
 * @typedef {ModalProps}
 */
interface ModalProps {
  show: boolean;
  size?: string;
  onClose?: () => void;
  children: ReactNode;
}

/**
 * Component for the modal
 * @date 3/24/2023 - 6:37:51 PM
 *
 * @export
 * @param {ModalProps} { show, size = '', onClose, children }
 * @returns {ReactElement}
 */
export default function Modal({ show, size = "", onClose, children }: ModalProps): ReactElement {
  const sizeClasses = useMemo(() => {
    switch (size) {
      case "medium":
        return "w-11/12 md:w-9/12 lg:w-8/12 xl:w-1/2";
      default:
        return "w-11/12 md:w-9/12 lg:w-8/12 xl:w-2/5";
    }
  }, [size]);

  const modalClassName = classNames("bg-white my-auto rounded-3.5xl relative mx-auto max-w-5xl py-6", sizeClasses);

  return (
    <Popup show={show} className="py-8" onClose={onClose} center>
      <div data-testid="modal-overlay" className={modalClassName}>{children}</div>
    </Popup>
  );
}
