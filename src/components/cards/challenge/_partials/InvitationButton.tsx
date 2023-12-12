import classNames from "classnames";
import { ReactElement } from "react";
import CloseIcon from "@/icons/close-icon.svg";
import CheckIcon from "@/icons/check.svg";

/**
 * Props for the button component
 * @date 7/27/2023 - 12:24:47 PM
 *
 * @interface InvitationButtonProps
 * @typedef {InvitationButtonProps}
 */
interface InvitationButtonProps {
  text: "accept" | "decline";
  confirmInvitation: (text: "accept" | "decline") => void;
}

/**
 * InvitationButton component
 * @date 7/27/2023 - 12:24:20 PM
 *
 * @export
 * @param {InvitationButtonProps} { text }
 * @returns {ReactElement}
 */
export default function InvitationButton({ text, confirmInvitation }: InvitationButtonProps): ReactElement {
  const buttonClassNames = classNames(`flex  items-center bg-white border text-sm px-3 py-1 gap-2`, {
    "text-green-700 border-green-700": text === "accept",
    "text-red-700 border-red-700": text === "decline",
  });

  return (
    <button
      className={buttonClassNames}
      onClick={(e) => {
        e.stopPropagation();
        confirmInvitation(text);
      }}
    >
      {text === "accept" ? <CheckIcon className="text-green-700" /> : <CloseIcon className="text-red-700" />}
      <span className="capitalize">{text}</span>
    </button>
  );
}
