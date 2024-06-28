import { useEffect, useState } from "react";
import Badge from "@/components/ui/Badge";
import NotificationList from "@/components/list/NotificationList";
import Button from "@/components/ui/button";
import BellIcon from "@/icons/notification-bell.svg";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";
import { fetchAllNotifications, readNotification } from "@/store/services/notification.service";

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

export default function NotificationPopup({ buttonStyles }: NotificationPopupProps) {
  const dispatch = useDispatch();
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);

  const unread = useSelector((state) => state.notifications.unread);

  useEffect(() => {
    dispatch(fetchAllNotifications());
  }, [dispatch]);

  const toggle = () => {
    setIsNotificationVisible(!isNotificationVisible);
    if (unread) {
      dispatch(readNotification());
    }
    dispatch(toggleBodyScrolling(!isNotificationVisible));
  };

  const externalClick = () => {
    if (!isNotificationVisible) return;
    setIsNotificationVisible(false);
    dispatch(toggleBodyScrolling(false));
  };

  return (
    <div>
      <span onClick={externalClick}>
        <li className={`inline-block align-middle mr-3 relative text-gray-500 max-w-80 ${isNotificationVisible ? "z-50" : "z-10"}`} onClick={toggle}>
          <Button type="button" padding={false} variant="secondary" className="p-2 bg-gray-100 bg-opacity-75 hover:bg-gray-50 text-primary" customStyle={buttonStyles}>
            <BellIcon />
            {unread > 0 && <Badge value={unread} className="top-0 -right-1 absolute"  size="small"/>}
          </Button>
        </li>
        {isNotificationVisible && (
          <div
            style={{
              width: "340px",
              maxHeight: "calc(100vh - 140px)",
              overflow: "hidden scroll",
            }}
            className="z-50 w-80 absolute top-14 right-0 bg-white py-4 px-4.5 rounded-3.5xl text-gray-900 no-scrollbar"
          >
            <NotificationList extended={false} />
          </div>
        )}
      </span>
      {isNotificationVisible && <div onClick={externalClick} className="opacity-25 fixed inset-0 z-30 bg-black" />}
    </div>
  );
}
