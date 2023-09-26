import classNames from "classnames";
import { ReactElement } from "react";
import CloseIcon from "@/icons/close-icon.svg";
import CheckIcon from "@/icons/check.svg";
import { acceptInvitation, declineInvitation } from "@/store/feature/communities/challenges/invites.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { getTeamById } from "@/store/services/teams.service";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * Props for the button component
 * @date 7/27/2023 - 12:24:47 PM
 *
 * @interface InvitationButtonProps
 * @typedef {InvitationButtonProps}
 */
interface InvitationButtonProps {
  text: "accept" | "decline";
  inviteId: string;
  teamRef?: string;
}

/**
 * InvitationButton component
 * @date 7/27/2023 - 12:24:20 PM
 *
 * @export
 * @param {InvitationButtonProps} { text }
 * @returns {ReactElement}
 */
export default function InvitationButton({ text, inviteId, teamRef }: InvitationButtonProps): ReactElement {
  const buttonClassNames = classNames(`flex  items-center bg-white border text-sm px-3 py-1 gap-2`, {
    "text-green-700 border-green-700": text === "accept",
    "text-red-700 border-red-700": text === "decline",
  });

  const dispatch = useDispatch();

  const { team } = useSelector((state) => ({ team: state.teams.current }));
  const confirmInvitation = async () => {
    if (!teamRef) return;
    const teamId = teamRef.split("/")[1];
    await dispatch(getTeamById(teamId));
    // TODO: Add a way of letting the user know that this  team is locked.
    if (team.locked) return;
    if (text === "accept") {
      await dispatch(acceptInvitation(inviteId));
    } else {
      await dispatch(declineInvitation(inviteId));
    }
  };

  return (
    <button className={buttonClassNames} onClick={confirmInvitation}>
      {text === "accept" ? <CheckIcon className="text-green-700" /> : <CloseIcon className="text-red-700" />}
      <span className="capitalize">{text}</span>
    </button>
  );
}
