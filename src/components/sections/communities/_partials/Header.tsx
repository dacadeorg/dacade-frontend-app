import Tag from "@/components/ui/Tag";
import classNames from "classnames";
import { ReactElement } from "react";

interface HeaderProps {
  hideTitleOnMobile?: boolean;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  isTeamChallenge?: boolean;
  isHackathon?: string;
}

export default function Header({
  hideTitleOnMobile = false,
  title = null,
  subtitle = null,
  description = null,
  isTeamChallenge = false,
  isHackathon,
}: HeaderProps): ReactElement {
  const headerClassName = classNames("text-4xl md:text-5xl leading-none", {
    "hidden md:flex": hideTitleOnMobile,
    "text-gray-400": subtitle,
    "text-gray-900": !subtitle,
  });

  return (
    <div>
      <h1 className={headerClassName}>{title}</h1>
      <div className="flex items-start gap-1">
        {subtitle && (
          <h2 className="text-4xl flex items-center font-normal leading-none md:text-5xl text-default">
            {subtitle}
            {isTeamChallenge && (
              <div className="h-full flex -mt-2 items-start ml-2">
                <Tag type="light">TEAM</Tag>
              </div>
            )}
          </h2>
        )}
        {isHackathon === "HACKATHON" && (
          <span className="border border-solid border-black rounded-full py-0.5 text-black font-medium px-2 text-xs items-start leading-4">Hackathon</span>
        )}
      </div>
      {description && <p className="lg:w-99 my-2 md:my-5 text-base md:text-.5xl w-full md:w-10/12 leading-loose md:leading-snug text-gray-700">{description}</p>}
    </div>
  );
}
