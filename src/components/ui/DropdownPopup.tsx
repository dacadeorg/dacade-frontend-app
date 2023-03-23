interface DropdownPopupProps {
  onClose: () => void;
  children?: React.ReactNode;
}
export default function DropdownPopup({
  onClose,
  children,
}: DropdownPopupProps) {
  const toggleInvite = () => {
    onClose();
  };
  return (
    <div
      style={{
        width: "calc(100vw - 40px)",
        maxWidth: "340px",
        maxHeight: "calc(100vh - 100px)",
        overflow: "hidden scroll",
      }}
      className="absolute top-14 right-0 z-40 bg-white rounded-3.5xl no-scrollbar text-gray-900"
    >
      {children}
    </div>
  );
}
