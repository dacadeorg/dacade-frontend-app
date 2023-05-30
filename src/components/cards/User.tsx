import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Currency from "@/components/ui/Currency";
import Tag from "@/components/ui/Tag";
import { useSelector } from "@/hooks/useTypedSelector";
import DateManager from "@/utilities/DateManager";
import classNames from "classnames";
import Link from "next/link";
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
  className?: string;
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
  children
}
 * @returns {ReactElement}
 */
export default function UserCard({ boxLayout, link, bordered, user, badge = "", timestamp, children, className }: UserProps): ReactElement {
  const { locale } = useRouter();
  const { colors, community } = useSelector((state) => ({
    colors: state.ui.colors,
    community: state.communities.current,
  }));

  const [humanizedDate, setHumanizedDate] = useState("");
  const [date, setDate] = useState("");
  const [profileURL, setProfileURL] = useState("");

  useEffect(() => {
    setHumanizedDate(DateManager.fromNow(timestamp.date, locale));
    setDate(DateManager.intlFormat(timestamp.date, locale));
    setProfileURL(`/profile/${user.username}`);
  }, [timestamp, user, locale]);

  const userCardClassName = classNames(`group bg-gradient-to-trw-full relative ${className}`, {
    "sm:p-6 flex space-x-3": boxLayout,
    "pl-5 sm:pl-7.5": !boxLayout,
    "cursor-pointer": link,
  });

  return (
    <div className={userCardClassName}>
      <div className={`z-10 ${boxLayout ? "relative flex-none" : "absolute top-0 left-0"}`}>
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
      <div className={`relative z-0 flex-1 ${bordered ? "group-hover:border-gray-50 border-l border-solid border-gray-200" : ""} ${!boxLayout ? "pl-10.5 pb-12" : ""}`}>
        <div className="pb-4">
          <div className="flex items-center space-x-1.5 pb-1.5 pt-1">
            <div className="text-lg font-medium leading-tight">
              <Link href={profileURL}>{user.displayName}</Link>
            </div>
            {user.reputation ? (
              <Tag type="light-gray" className="leading-tight">
                <Currency value={user.reputation} token="REP" />
              </Tag>
            ) : (
              <></>
            )}
          </div>
          <span className="block text-sm leading-snug text-gray-700 ">
            {timestamp.text}{" "}
            <span
              title={date}
              className="font-medium"
              style={{
                color: colors?.textAccent,
              }}
            >
              {humanizedDate}
            </span>
          </span>
        </div>
        {link ? <Link href={link}>{children}</Link> : <>{children}</>}
      </div>
    </div>
  );
}
