import classNames from "classnames";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
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
  // this is a notication list mock.
  const notifications: any[] = [];
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
