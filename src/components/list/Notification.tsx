import { ReactElement } from "react";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import NotificationCard from "@/components/cards/NotificationCard";

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

export default function Notification({
  extended,
}: NotificationProps): ReactElement {
  //  TODO:  to be uncommented when user notifications slice is implemented
  //  const notifications = useSelector((state) => state.user.notifications);
  const notifications: any[] = [];

  //  TODO:  to be uncommented when user slice is implemented
  //  const user = useSelector((state) => state.user);
  const user = {};

  const { t } = useTranslation("common");

  return (
    <div className="text-left relative">
      {!extended && (
        <span className="uppercase block text-xs font-semibold text-gray-500 leading-relaxed">
          {t("nav.notification")}
        </span>
      )}
      <div
        className={classNames({
          "space-y-4 mt-3": !extended,
          "space-y-4": extended,
        })}
      >
        {notifications.map((notification) => {
          return (
            <NotificationCard
              key={notification.id}
              user={user}
              details={notification}
              extended={extended}
            />
          );
        })}
      </div>
    </div>
  );
}
