import { ReactElement, useMemo } from "react";
import { useRouter } from "next/router";
import Avatar from "@/components/ui/Avatar";
import DateManager from "@/utilities/DateManager";
import { Metadata } from "@/types/course";

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
 * Details interface
 * @date 3/28/2023 - 9:03:50 PM
 *
 * @interface Details
 * @typedef {Details}
 */
interface Details {
  message: string;
  created_at: Date;
  metadata: Metadata;
  link: string;
  type: string;
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
  details: Details;
  extended?: boolean;
}

/**
 * NotificationCard component
 * @date 3/28/2023 - 8:57:59 PM
 *
 * @export
 * @param {NotificationCardProps} {
  user = {},
  details,
  extended = false,
}
 * @returns {ReactElement}
 */
export default function NotificationCard({
  user = {},
  details,
  extended = false,
}: NotificationCardProps): ReactElement {
  const router = useRouter();

  const humanizedDate = useMemo(
    () => DateManager.fromNow(details.created_at, router.locale),
    [details.created_at, router.locale]
  );

  const date = useMemo(
    () => DateManager.intlFormat(details.created_at, router.locale),
    [details.created_at, router.locale]
  );

  const link = useMemo(() => {
    const { type } = details;
    if (
      type === "SUBMISSION" ||
      type === "REFERRAL" ||
      type === "FEEDBACK"
    ) {
      return `/${details.metadata.submissions}`;
    } else {
      return details.link;
    }
  }, [details]);

  const notificationsLink = useMemo(() => {
    if (!link) return "";
    return `/${router.locale}${link}`;
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
    <div
      onClick={goToLink}
      className={`flex hover:bg-gray-50 py-4 -mx-5 px-5 cursor-pointer ${
        extended ? "rounded-3xl" : ""
      }`}
    >
      <div className="flex mr-2 w-10 h-10 overflow-hidden relative">
        <Avatar user={user} />
      </div>
      <div className="pt-1 -mt-2">
        <span className="block text-base text-gray-700">
          {details.message}
        </span>
        <span
          title={date}
          className="block text-gray-900 font-medium text-sm"
        >
          {humanizedDate}
        </span>
      </div>
    </div>
  );
}
