import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import Currency from "@/components/ui/Currency";
import Tag from "@/components/ui/Tag";
import { useSelector } from "@/hooks/useTypedSelector";
import { User, Submission } from "@/types/bounty";
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
  expanded?: boolean;
  user: User;
  badge?: string;
  timestamp: {
    date: Date;
    text: string;
  };
  children?: ReactNode;
  className?: string;
  submission?: Submission;
  teamMembers?: User[];
  onClick?: () => void;
  testId?: string;
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
export default function UserCard({
  boxLayout,
  link,
  bordered,
  expanded,
  user,
  badge = "",
  timestamp,
  children,
  className,
  teamMembers,
  onClick,
  testId = "userId",
}: UserProps): ReactElement {
  const { locale, push } = useRouter();
  const colors = useSelector((state) => state.ui.colors);

  const [humanizedDate, setHumanizedDate] = useState("");
  const [date, setDate] = useState("");
  const [profileURL, setProfileURL] = useState("");

  useEffect(() => {
    setHumanizedDate(DateManager.fromNow(timestamp.date, locale));
    setDate(DateManager.intlFormat(timestamp.date, locale));
    setProfileURL(`/profile/${user?.username}`);
  }, [timestamp, user, locale]);

  const handleClick = () => {
    if (!onClick) return;
    if (!window) return onClick();
    const selection = window.getSelection();
    if (selection?.type === "Caret") return onClick();
  };
  const userCardClassName = classNames(`group relative ${className}`, {
    "sm:p-6 flex space-x-3": boxLayout,
    "pl-5 sm:pl-7.5": !boxLayout,
    "cursor-pointer": link,
  });
  console.log("this is the user test id", testId);
  return (
    <div data-testid={testId} className={userCardClassName} onClick={handleClick}>
      <div className={`z-10 ${boxLayout ? "relative flex-none" : "absolute top-0 left-0"}`}>
        {teamMembers && teamMembers?.length ? (
          <div className="w-15 h-15 rounded-full bg-gray-800 overflow-hidden grid grid-cols-2 items-between">
            {teamMembers?.map((user) => (
              <Avatar key={user.id} user={user} shape="squared" size="fixed" hideVerificationBadge={true} />
            ))}
          </div>
        ) : (
          <>
            <Avatar user={user} size="medium" />
            {badge && (
              <Badge
                value={badge}
                className="absolute"
                customStyle={{
                  bottom: "-1px",
                  right: "-3px",
                  backgroundColor: colors.textAccent,
                }}
              />
            )}
          </>
        )}
      </div>
      <div
        className={`relative z-0 flex-1 ${expanded ? "pb-24" : ""} ${bordered ? "group-hover:border-gray-50 border-l border-solid border-gray-200" : ""} ${
          !boxLayout ? "pl-10.5 pb-12" : ""
        }`}
      >
        <div className="pb-4">
          <div className="flex gap-4 w-full overflow-hidden">
            {teamMembers && teamMembers?.length ? (
              <>
                {teamMembers?.map((user, index) => {
                  return (
                    <div className="flex items-center space-x-1.5 pb-1.5 pt-1" key={`team-member-${index}`}>
                      <div className="text-lg font-medium leading-tight">
                        <Link href={profileURL}>{user?.username}</Link>
                      </div>
                      {user.reputation ? (
                        <Tag type="light-gray" className="leading-tight">
                          <Currency value={user.reputation} token="REP" />
                        </Tag>
                      ) : (
                        <></>
                      )}
                    </div>
                  );
                })}
              </>
            ) : (
              <div className="flex items-center space-x-1.5 pb-1.5 pt-1">
                <div className="text-lg font-medium leading-tight">
                  <Link href={profileURL}>{user?.displayName}</Link>
                </div>
                {user.reputation ? (
                  <Tag type="light-gray" className="leading-tight">
                    <Currency value={user.reputation} token="REP" />
                  </Tag>
                ) : (
                  <></>
                )}
              </div>
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
        {link ? <div onClick={() => push(link)}>{children}</div> : <>{children}</>}
      </div>
    </div>
  );
}
