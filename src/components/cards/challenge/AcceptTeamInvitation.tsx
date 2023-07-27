import { Notification } from "@/types/notification";
import { ReactElement } from "react";
import Button from "./_partials/Button";

/**
 * Props for AcceptTeamInvitation component
 * @date 7/27/2023 - 12:22:46 PM
 *
 * @interface AcceptTeamInvitationProps
 * @typedef {AcceptTeamInvitationProps}
 */
interface AcceptTeamInvitationProps {
  index: number;
  title: string;
  text: string;
  teamInvitations: Notification[];
}

/**
 * AcceptTeamInvitation component
 * @date 7/27/2023 - 12:21:01 PM
 *
 * @export
 * @param {AcceptTeamInvitationProps} { index, title, text, teamInvitations }
 * @returns {ReactElement}
 */
export default function AcceptTeamInvitation({ index, title, text, teamInvitations }: AcceptTeamInvitationProps): ReactElement {
  return (
    <div className="flex flex-col relative flex-grow p-6 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200">
      <div className="flex flex-col justify-between w-full sm:pb-0">
        <div className="flex flex-col">
          <div className="text-lg font-medium leading-normal text-gray-900">
            <span>{index}.</span>
            <span className="ml-2">{title}</span>
          </div>
          <div className="text-sm font-normal text-gray-700 max-w-xxs mt-3 pb-9">{text}</div>
        </div>
      </div>
      <div>
        {teamInvitations.map((invite, index) => (
          <div key={index} className="space-y-3">
            <p className="text-sm font-normal text-gray-700 max-w-xxs">{invite.message}</p>
            <div className="flex gap-3">
              <Button text="accept" />
              <Button text="decline" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
