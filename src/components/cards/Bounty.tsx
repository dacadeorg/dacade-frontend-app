import navigation from "@/plugins/navigation";
import { Bounty } from "@/types/bounty";
import Link from "next/link";
import { ReactElement } from "react";
import Avatar from "../ui/Avatar";
import Reward from "../ui/Reward";

/**
 * Interface for the bounty props
 * @date 3/28/2023 - 5:00:22 PM
 *
 * @interface BountyProps
 * @typedef {BountyProps}
 */
interface BountyProps {
  link: string;
  bounty: Bounty;
  type: string;
  isExternalLink: boolean;
}

/**
 * Bounty component
 * @date 3/28/2023 - 5:00:45 PM
 *
 * @export
 * @param {BountyProps} { link, bounty, type, isExternalLink }
 * @returns {ReactElement}
 */
export default function Bounty({
  link,
  bounty,
  type,
  isExternalLink,
}: BountyProps): ReactElement {
  return (
    <div className="cursor-pointer flex md:flex-row-reverse md:space-x-5 px-5 min-h-32 md:h-auto md:w-full justify-between hover:bg-secondary relative">
      <div className="bg-theme-accent flex-col w-full h-full justify-between md:-space-y-1 pl-3 pr-5 mt-7 mb-5">
        {isExternalLink ? (
          <a href={link} className="relative w-full block">
            <div className="font-medium text-md md:pt-1.5">
              {bounty.course ? bounty.course.name : bounty.name}
            </div>
          </a>
        ) : (
          <Link href={link} className="relative w-full block">
            <div className="font-medium text-md md:pt-1.5">
              {bounty.course ? bounty.course.name : bounty.name}
            </div>
          </Link>
        )}

        {isExternalLink ? (
          <a
            href={link}
            className="inline-flex md:flex h-2/3 md:flex-row flex-col-reverse justify-between"
          >
            <div className="text-sm pt-8 md:pt-2 md:pb-4 text-gray-600">
              {type}
            </div>
            <div>
              <Reward reward={bounty.reward} />
            </div>
          </a>
        ) : (
          <Link
            href={link}
            className="inline-flex md:flex h-2/3 md:flex-row flex-col-reverse justify-between"
          >
            <div className="text-sm pt-8 md:pt-2 md:pb-4 text-gray-600">
              {type}
            </div>
            <div>
              <Reward reward={bounty.reward} />
            </div>
          </Link>
        )}

        {bounty.submissions && bounty.submissions.length && (
          <div className="mt-4 space-y-0 divide-y divide-gray-200 border-t border-t-solid border-gray-200">
            {bounty.submissions.map((submission) => (
              <Link
                key={submission.id}
                href={
                  navigation.community.submissionPath(
                    submission.id,
                    bounty.challenge,
                    bounty.course.slug,
                    bounty.slug
                  )
                }
                className="flex space-x-1 relative text-sm font-medium py-3"
              >
                <div className="flex justify-between w-full pr-0">
                  <div className="flex space-x-1">
                    <Avatar
                      user={submission.user}
                      size="mini"
                      style={{ fontSize: "14px" }}
                      href={link}
                    />
                    <div>{submission.user.displayName}</div>
                  </div>

                  {submission.status === "approved" && (
                    <span className="text-green-500">Approved</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
