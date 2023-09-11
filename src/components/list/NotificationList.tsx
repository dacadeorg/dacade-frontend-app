import { ReactElement } from "react";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import NotificationCard from "@/components/cards/NotificationCard";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { User } from "@/types/bounty";
import { Notification } from "@/types/notification";

/**
 * Notification props interface
 * @date 3/28/2023 - 12:02:30 PM
 * @interface NotificationProps
 * @typedef {NotificationProps}
 * @property {boolean} extended
 */

interface NotificationProps {
  extended: boolean;
}

/**
 * Notification Component
 * @date 3/28/2023 - 12:02:39 PM
 * @export
 * @param {NotificationProps} {
 *  extended,
 * }
 * @returns {ReactElement}
 *
 */

export default function NotificationList({ extended }: NotificationProps): ReactElement {
  // const { notifications, user } = useSelector((state) => ({
  //   notifications: state.notifications.notifications,
  //   user: state.user.data,
  // }));

  const { notifications, user } = useMultiSelector<unknown, { notifications: Notification[]; user: User | null }>({
    notifications: (state) => state.notifications.notifications,
    user: (state) => state.user.data,
  });

  const { t } = useTranslation();

  return (
    <div className="text-left relative">
      {!extended && <span className="uppercase block text-xs font-semibold text-gray-500 leading-relaxed">{t("nav.notification")}</span>}
      <div
        className={classNames({
          "space-y-4 mt-3": !extended,
          "space-y-4": extended,
        })}
      >
        {notifications.map((notification) => {
          return <NotificationCard key={notification.id} user={user as User} notification={notification} extended={extended} />;
        })}
      </div>
    </div>
  );
}
