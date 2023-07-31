import { ReactElement, useMemo } from "react";
import { useRouter } from "next/router";
import Avatar from "@/components/ui/Avatar";
import DateManager from "@/utilities/DateManager";
import { Notification } from "@/types/notification";
import InvitationButton from "./challenge/_partials/InvitationButton";

/**
 * User interface
 * @date 3/28/2023 - 9:00:57 PM
 *
 * @interface User
 * @typedef {User}
 */
interface User {
  displayName?: string;
  username?: string;
  avatar?: string;
}

/**
 * Interface for notification component props
 * @date 3/28/2023 - 8:57:52 PM
 *
 * @interface NotificationCardProps
 * @typedef {NotificationCardProps}
 */
interface NotificationCardProps {
  user: User;
  notification: Notification;
  extended?: boolean;
}

/**
 * Enum for notification types
 * @date 3/28/2023 - 9:04:03 PM
 * @enum {string}
 * @typedef {TYPES}
 * @property {string} SUBMISSION
 * @property {string} REFERRAL
 * @property {string} FEEDBACK
 * @readonly
 *
 * */
enum TYPES {
  SUBMISSION = "SUBMISSION",
  REFERRAL = "REFERRAL",
  FEEDBACK = "FEEDBACK",
}

/**
 * NotificationCard component
 * @date 3/28/2023 - 8:57:59 PM
 *
 * @export
 * @param {NotificationCardProps} {
  user = {},
  notification,
  extended = false,
}
 * @returns {ReactElement}
 */
export default function NotificationCard({ user = {}, notification, extended = false }: NotificationCardProps): ReactElement {
  const router = useRouter();

  /**
   * Format the date to a human-readable string
   * @date 4/28/2023 - 8:39:18 PM
   *
   * @type {string}
   */
  const humanizedDate: string = useMemo(() => DateManager.fromNow(notification.created_at as Date, router.locale), [notification.created_at, router.locale]);

  const date = useMemo(() => DateManager.intlFormat(notification.created_at, router.locale), [notification.created_at, router.locale]);

  /**
   * Generate the notification link according to the type of notification
   * @date 4/28/2023 - 8:40:01 PM
   *
   * @type {string}
   */
  const link: string = useMemo(() => {
    const { type } = notification;

    if (type === TYPES.SUBMISSION || type === TYPES.REFERRAL || type === TYPES.FEEDBACK) {
      return `/${notification.metadata.submission}`;
    } else {
      return notification.link;
    }
  }, [notification]);

  const notificationsLink = useMemo(() => {
    if (!link) return "";
    return `/${link}`;
  }, [link, router.locale]);

  const goToLink = () => {
    if (!link) return;
    if (link.startsWith("/")) {
      router.push(notificationsLink);
    } else {
      window.open(link, "_blank");
    }
  };

  return (
    <>
      <div onClick={goToLink} className={`flex hover:bg-gray-50 py-4 -mx-5 px-5 cursor-pointer ${extended ? "rounded-3xl" : ""}`}>
        <div className="flex mr-2">
          <Avatar user={user} size="medium-fixed" className="!w-10 !h-10" />
        </div>
        <div className="pt-1 -mt-2">
          <span className="block text-base text-gray-700">{notification.message}</span>
          <span title={date} className="block text-gray-900 font-medium text-sm">
            {humanizedDate}
          </span>
        </div>
      </div>
      {notification?.type === "TEAM_INVITE" && (
        <div className="px-5 flex gap-3">
          <InvitationButton text="accept" inviteId={notification.metadata?.invite_id as string} />
          <InvitationButton text="decline" inviteId={notification.metadata?.invite_id as string} />
        </div>
      )}
    </>
  );
}
