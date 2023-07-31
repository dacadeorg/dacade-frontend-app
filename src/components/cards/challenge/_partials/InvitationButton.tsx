import classNames from "classnames";
import { ReactElement } from "react";
import CloseIcon from "@/icons/close-icon.svg";
import CheckIcon from "@/icons/check.svg";
import { acceptInvitation, declineInvitation } from "@/store/feature/communities/challenges/invites.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import api from "@/config/api";

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
}

/**
 * InvitationButton component
 * @date 7/27/2023 - 12:24:20 PM
 *
 * @export
 * @param {InvitationButtonProps} { text }
 * @returns {ReactElement}
 */
export default function InvitationButton({ text, inviteId }: InvitationButtonProps): ReactElement {
  const buttonClassNames = classNames(`flex  items-center bg-white border text-sm px-3 py-1 gap-2`, {
    "text-green-700 border-green-700": text === "accept",
    "text-red-700 border-red-700": text === "decline",
  });

  const dispatch = useDispatch();
  const confirmInvitation = async () => {
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
