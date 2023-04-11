import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Currency from "@/components/ui/Currency";
import Tag from "@/components/ui/Tag";
import { useSelector } from "@/hooks/useTypedSelector";
import DateManager from "@/utilities/DateManager";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState } from "react";

/**
 * Interface for the user props
 * @date 3/30/2023 - 9:58:14 AM
 *
 * @interface UserProps
 * @typedef {UserProps}
 */
interface UserProps {
  boxLayout?: boolean;
  link?: string;
  bordered?: boolean;
  user: any;
  badge?: string;
  timestamp: any;
  children?: ReactNode;
}

/**
 * User card component
 * @date 3/30/2023 - 9:58:36 AM
 *
 * @export
 * @param {UserProps} {
  boxLayout,
  link,
  bordered,
  user,
  badge,
  timestamp,
}
 * @returns {ReactElement}
 */
export default function UserCard({
  boxLayout,
  link,
  bordered,
  user,
  badge,
  timestamp,
  children,
}: UserProps): ReactElement {
  const { locale } = useRouter();
  const colors = useSelector((state) => state.ui.colors);
  // TODO: to be uncommented when community slice is implemented.
  // const community = useSelector((state) => state.communities.current);
  const [humanizedDate, setHumanizedDate] = useState("");
  const [date, setDate] = useState("");
  const [profileURL, setProfileURL] = useState("");

  useEffect(() => {
    setHumanizedDate(DateManager.fromNow(timestamp.date, locale));
    setDate(DateManager.intlFormat(timestamp.date, locale));
    setProfileURL(`/profile/${user.username}`);
  }, [locale, timestamp, user]);

  return (
    <div
      className={`group bg-gradient-to-trw-full relative ${
        boxLayout ? "sm:p-6" : "pl-5 sm:pl-7.5"
      } ${link ? "cursor-pointer" : ""} ${
        boxLayout ? "flex space-x-3" : ""
      }`}
    >
      <div
        className={`z-10 ${
          boxLayout ? "relative flex-none" : "absolute top-0 left-0"
        }`}
      >
        <Avatar user={user} size="medium" />
        {badge && (
          <Badge
            value={badge}
            className="absolute"
            size="medium"
            customStyle={{
              bottom: "-1px",
              right: "-3px",
              backgroundColor: colors.textAccent,
            }}
          />
        )}
      </div>
      <div
        className={`relative z-0 flex-1 ${
          bordered
            ? "group-hover:border-gray-50 border-l border-solid border-gray-200"
            : ""
        } ${!boxLayout ? "pl-10.5 pb-12" : ""}`}
      >
        <div className="pb-4">
          <div className="flex items-center space-x-1.5 pb-1.5 pt-1">
            <div className="text-lg leading-tight font-medium">
              <a href={profileURL}>{user.displayName}</a>
            </div>
            {user.reputation && (
              <Tag type="light-gray" className="leading-tight">
                <Currency value={user.reputation} token="REP" />
              </Tag>
            )}
          </div>
          <span className="block text-sm leading-snug text-gray-700">
            {timestamp.text}{" "}
            <span
              title={date}
              className="font-medium"
              style={{
                color: colors.textAccent,
              }}
            >
              {humanizedDate}
            </span>
          </span>
        </div>
        {link ? <a href={link}>{children}</a> : <>{children}</>}
      </div>
    </div>
  );
}
