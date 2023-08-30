import { User } from "@/types/bounty";
import Image from "next/image";
import { ReactElement } from "react";

interface TeamProfileProps {
  users?: User[];
}
/**
 * This component displays the combination of team members' avatars as a team profile.
 * @date 8/28/2023 - 4:49:57 PM
 *
 * @export
 * @param {TeamProfileProps}
 * @returns {ReactElement}
 */
export default function TeamProfile({ users }: TeamProfileProps): ReactElement {
  return (
    <div className="w-15 h-15 rounded-full overflow-hidden flex justify-between bg-gray-800 items-between flex-wrap">
      {users?.map((user) => (
        <div key={user.id} className="bg-blue-600">
          {user.avatar ? (
            <Image src={user.avatar} width={30} height={30} alt="profile" />
          ) : (
            <div className="w-7.5 h-7.5 flex justify-center items-center font-medium text-xs capitalize text-white">{user.displayName.charAt(0)}</div>
          )}
        </div>
      ))}
    </div>
  );
}
