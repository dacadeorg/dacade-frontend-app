import Image from "next/image";
import { ReactElement } from "react";
/**
 * This component displays the combination of team members' avatars as a team profile.
 * @date 8/28/2023 - 4:49:57 PM
 *
 * @export
 * @param {{ avatars?: string }} { avatars }
 * @returns {ReactElement}
 */
export default function TeamProfile({ avatars }: { avatars?: string }): ReactElement {
  return (
    // this component will be completed once we have team user profile images
    <div className=" w-15 h-15 rounded-full overflow-hidden flex justify-between items-between flex-wrap">
      {/* Dummy data is used for now  */}
      {[avatars, avatars, avatars, avatars].map((avatar, index) => (
        <div key={index} className="bg-blue-600">
          {avatar ? (
            <Image src={avatar} width={30} height={30} alt="profile" />
          ) : (
            <div className="w-7.5 h-7.5 flex justify-center items-center font-medium text-xs text-white">L</div>
          )}
        </div>
      ))}
    </div>
  );
}
