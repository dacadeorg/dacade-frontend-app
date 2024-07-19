import { ReactElement } from "react";
import { Invite } from "@/types/challenge";
import ReplyToInvitation from "./_partials/ReplyToInvitation";

/**
 * Props for ConfirmTeamInvitation component
 * @date 7/27/2023 - 12:22:46 PM
 *
 * @interface ConfirmTeamInvitationProps
 * @typedef {ConfirmTeamInvitationProps}
 */
export interface ConfirmTeamInvitationProps {
  index: number;
  title: string;
  text: string;
  invite: Invite;
  confirmInvitationTestId?: string
}

/**
 * ConfirmTeamInvitation component
 * @date 7/27/2023 - 12:21:01 PM
 *
 * @export
 * @param {ConfirmTeamInvitationProps} { index, title, text, invites }
 * @returns {ReactElement}
 */
export default function ConfirmTeamInvitation({ index, title, text, invite,confirmInvitationTestId }: ConfirmTeamInvitationProps): ReactElement {
  return (
    <div 
    data-testid={confirmInvitationTestId}  
    className="flex flex-col relative flex-grow p-6 rounded-3xl group text-gray-700 sm:p-7 border-solid border border-gray-200">
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
        <div className="space-y-3">
          <p className="text-sm font-normal text-gray-700 max-w-xxs">
            {invite?.team?.organizer?.displayName} added you to their team for the {invite?.team?.challenge?.name} challenge. Would you like to accept?
          </p>
          <ReplyToInvitation ReplyToInvitationTestId= "reply-to-invitation"  invite_id={invite?.id} team_ref={invite?.team_ref} />
        </div>
      </div>
    </div>
  );
}
