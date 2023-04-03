import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import NotificationList from "@/components/list/Notification";
import Button from "@/components/ui/button";
import BellIcon from "@/icons/notification-bell.svg";

/**
 * Notification Popup Interface
 * @date 3/29/2023 - 12:18:26 PM
 * @interface NotificationPopupProps
 * @typedef {NotificationPopupProps}
 * @param {Function} close
 * @returns {ReactElement}
 *
 * */
interface NotificationPopupProps {
  buttonStyles?: object;
  badgeStyles?: object;
}

/**
 * Notification Popup Component
 * @date 3/29/2023 - 12:17:37 PM
 * @export
 * @param {NotificationPopupProps} {
 * close,
 * }
 *
 *  @returns {ReactElement}
 *
 * */

export default function NotificationPopup({
  buttonStyles,
  badgeStyles,
}: NotificationPopupProps) {
  const [show, setShow] = useState(false);

  // TODO: will be uncommented when the redux store is ready
  //   const unread = useSelector(
  //     (state) => state.user.notifications.unread
  //   );

  // TODO: will be removed when the redux store is ready
  const unread: any = [];

  useEffect(() => {
    // dispatch("user/notifications/all");
  }, []);

  const toggle = () => {
    setShow(!show);
    if (unread && show) {
      //   dispatch("user/notifications/read");
    }
    // dispatch("ui/toggleBodyScrolling", show);
  };

  const externalClick = () => {
    if (!show) return;
    setShow(false);
    // dispatch("ui/toggleBodyScrolling", show);
  };

  return (
    <div>
      <span onClick={externalClick}>
        <li
          className={`inline-block align-middle mr-2 relative text-gray-500 ${
            show ? "z-50" : "z-10"
          }`}
          style={{ width: "calc(100vw - 40px)", maxWidth: "340px" }}
          onClick={() => setShow(!show)}
        >
          <Button
            type="button"
            padding={false}
            variant="secondary"
            className="p-2 bg-gray-100 bg-opacity-75 hover:bg-gray-50"
            customStyle={buttonStyles}
          >
            <BellIcon />
            {unread > 0 && (
              <Badge
                value={unread}
                className="top-0 -right-1 absolute"
              />
            )}
          </Button>
        </li>
        {show && (
          <div
            style={{
              width: "340px",
              maxHeight: "calc(100vh - 140px)",
              overflow: "hidden scroll",
            }}
            className="z-50 w-80 absolute top-14 right-0 bg-white py-4 px-4.5 rounded-3.5xl text-gray-900 no-scrollbar"
          >
            <NotificationList />
          </div>
        )}
      </span>
      {show && (
        <div className="opacity-25 fixed inset-0 z-30 bg-black" />
      )}
    </div>
  );
}
