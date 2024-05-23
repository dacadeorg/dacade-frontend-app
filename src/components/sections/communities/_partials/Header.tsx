import Tag from "@/components/ui/Tag";
import classNames from "classnames";
import { ReactElement } from "react";

interface HeaderProps {
  hideTitleOnMobile?: boolean;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  isTeamChallenge?: boolean;
  isHackathon?: boolean;
}

export default function Header({
  hideTitleOnMobile = false,
  title = null,
  subtitle = null,
  description = null,
  isTeamChallenge = false,
  isHackathon = false,
}: HeaderProps): ReactElement {
  const headerClassName = classNames("text-4xl md:text-5xl leading-none text-gray-900", {
    "hidden md:flex": hideTitleOnMobile,
  });

  return (
    <div>
      <h1 className={headerClassName}>{title}</h1>
      <div className="flex items-start gap-1">
        {subtitle && (
          <h2 className={`text-4xl flex items-center font-normal leading-none md:text-5xl ${title? "text-gray-400": "text-gray-900"}`}>
            {subtitle}
            {isTeamChallenge && (
              <div className="h-full flex -mt-2 items-start ml-2">
                <Tag type="gray">{isHackathon ? "Hackathon" : "TEAM"}</Tag>
              </div>
            )}
          </h2>
        )}
      </div>
      {description && <p className="lg:w-182.5 my-2 md:my-5 text-base md:text-.5xl w-full md:w-10/12 leading-loose md:leading-snug text-gray-700">{description}</p>}
    </div>
  );
}
