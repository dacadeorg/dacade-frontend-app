import { ReactElement } from "react";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import NotificationCard from "@/components/cards/NotificationCard";
import { useSelector } from "@/hooks/useTypedSelector";
import { User } from "@/types/bounty";

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
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const user = useSelector((state) => state.user.data);

  const { t } = useTranslation();

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
              user={user as User}
              notification={notification}
              extended={extended}
            />
          );
        })}
      </div>
    </div>
  );
}
