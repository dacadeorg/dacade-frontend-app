import React from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import Link from "next/link";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = ({}) => {
  const currentCommunity = useSelector((state) => state.communities.current);

  const isActive = (link: string): boolean => {
    if (typeof window !== "undefined") {
      return window.location.pathname === link;
    }
    return false;
  };

  const scoreboardLink = currentCommunity
    ? `/communities/${currentCommunity.slug}/scoreboard`
    : "";
  const mainLink = currentCommunity ? `/communities/${currentCommunity.slug}` : "";

  return (
    <div className="flex flex-col divide-y divide-solid divide-gray-100 w-full text-gray-700 space-y-6">
      <Link
        href={mainLink}
        className={isActive(mainLink) ? "" : "opacity-80"}
      >
        <div className="font-medium text-.5xl leading-snug">Challenges</div>
        <div className="text-sm font-light lg:w-full lg:pr-7 pt-2 mb-6 md:mb-0">
          In the courses of this community, you will be able to learn about new
          technologies, solve challenges, get feedback, and earn bounties.
        </div>
      </Link>
      {currentCommunity && (
        <Link
          href={scoreboardLink}
          className={isActive(scoreboardLink) ? "" : "opacity-80"}
        >
          <div className="font-medium text-.5xl leading-snug">Scoreboard</div>
          <div className="text-sm font-light lg:w-full lg:pr-7 pt-2">
            On the scoreboard, you can see which users have accumulated the most
            reputation by giving valuable feedback to their peers.
          </div>
        </Link>
      )}
    </div>
  );
};

export default Sidebar;
