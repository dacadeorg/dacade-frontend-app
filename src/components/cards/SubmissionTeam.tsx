import React from "react";
import ArrowButton from "@/components/ui/button/Arrow";
import Link from "next/link";
import Avatar from "@/components/ui/Avatar";

/**
 * Props for the SubmissionTeam component.
 */
interface SubmissionTeamCardProps {
  index?: number | string;
  title?: string;
  text?: string;
}

/**
 * SubmissionTeam component.
 *
 * @param {SubmissionTeamProps} props - The props for the SubmissionTeam component.
 * @returns {JSX.Element} The SubmissionTeam component JSX element.
 */

export default function SubmissionTeamCard({ index = 1., title = "", text = "" }: SubmissionTeamCardProps): JSX.Element {
  const path = `/communities/`; // This is link is not the actual link; we will replace it after it's done in the backend
  return (
    <div className="flex flex-col relative md:w-1/2 p-6 divide-y sm:divide-y-0 sm:divide-x divide-gray-200 rounded-3xl group text-gray-700 sm:p-7 mb-4 border-solid border border-gray-200">
      <div className="flex flex-col justify-between w-full sm:pb-0">
        <div className="flex flex-col">
          <div className="text-lg font-medium leading-normal text-gray-900">
            <span>{index}.</span>
            <span className="ml-2">{title}</span>
          </div>
          <div className="text-sm font-normal text-gray-700 mt-3 max-w-xxs pb-6">{text}</div>

          <div className="w-full p-4 text-left flex">
            <div className="pr-3.5">
              <Avatar user={user as User} size="medium" useLink={false} hideVerificationBadge />
            </div>
            <div className="pt-2">
              <span className="font-medium text-base block leading-normal capitalize">{username}</span>
              <Link className="self-end text-sm block leading-normal" href="/profile" onClick={onClose}>
                {t("nav.view-profile")}
              </Link>
            </div>
          </div>
          <div className="mr-4 mb-6 text-gray-500 self-end text-right whitespace-nowrap align-text-bottom font-normal cursor-pointer text-sm" onClick={onLogout}>
            <span>{t("nav.sign-out")}</span>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
