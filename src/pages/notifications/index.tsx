import { ReactElement, useEffect, useMemo } from "react";
import DefaultLayout from "@/components/layout/Default";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import i18Translate from "@/utilities/I18Translate";
import { GetStaticProps } from "next";
import Link from "next/link";
import convertNotificationDate from "@/utilities/convertNotificationDate";

/**
 * Notifications page.
 * @date 5/22/2023 - 10:37:34 AM
 *
 * @export
 * @returns
 */
export default function Notifications() {
  const notifications = useSelector((state) => state.notifications.notifications);

  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(markNotificationsRead, 5000);
    return () => clearTimeout(timer);
  }, []);

  const markNotificationsRead = () => {
    Object.values(notifications).forEach((notification) => {
      if (!notification.read) {
        const notificationUpdate = {
          id: notification.id,
          userId: notification.user_id,
        };
        // dispatch(markAsRead(notificationUpdate));
      }
    });
  };

  const orderDesc = useMemo(() => Object.values(notifications).reverse(), [notifications]);

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-8 col-xl-6 mx-auto mt-4">
            {notifications && (
              <div>
                <div className="text-center mb-4"></div>
                {orderDesc.map((notification) => (
                  <div key={notification.id} className={`muted-dark  text-white mb-4 notification ${notification.read ? "" : "unread"}`}>
                    <Link href={notification.link || ""}>
                      <div>
                        <b>{convertNotificationDate(new Date(notification.created_at))}</b>
                        <p className="mt-2">{notification.message}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

Notifications.getLayout = function (page: ReactElement) {
  return <DefaultLayout footerBackgroundColor={false}>{page}</DefaultLayout>;
};
export const getStaticProps: GetStaticProps = async ({ locale }) => i18Translate(locale as string);
