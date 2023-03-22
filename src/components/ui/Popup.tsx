import classNames from "classnames";

interface PopupProps {
  center?: boolean;
  onClose?: () => void;
  show?: boolean;
  children?: React.ReactNode;
}
export default function popup({ center, onClose, show, children }: PopupProps) {
  return show ? (
    <div
      v-if="show"
      className={classNames(
        "fixed z-999 w-screen h-screen overflow-y-scroll top-0 left-0",
        { "flex items-center": center }
      )}
    >
      <div
        className="opacity-25 fixed inset-0 z-0 bg-black w-full h-screen top-0 left-0"
        onClick={onClose}
      />
      {children}
    </div>
  ) : null;
}
