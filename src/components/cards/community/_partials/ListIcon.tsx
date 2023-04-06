import ThemeWrapper from "@/components/wrappers/ThemeWrapper";
import Image from "next/image";
import { ReactElement } from "react";

/**
 * Colors interface
 * @date 3/30/2023 - 3:49:04 PM
 *
 * @interface Colors
 * @typedef {Colors}
 */
interface Colors {
  textAccent: string;
  text: string;
  accent: string;
  primary: string;
}

/**
 * Community interface
 * @date 3/30/2023 - 3:49:16 PM
 *
 * @interface Community
 * @typedef {Community}
 */
interface Community {
  name: string;
  description?: string;
  icon: string;
  metadata?: {
    submissions?: number;
  };
  colors: Colors;
}


/**
 * Interface for CommunityListCardIcon component props
 * @date 3/30/2023 - 3:49:38 PM
 *
 * @interface CommunityListCardIconProps
 * @typedef {CommunityListCardIconProps}
 */
interface CommunityListCardIconProps {
  community: Community;
}

export default function CommunityListCardIcon({
  community,
}: CommunityListCardIconProps): ReactElement {
  const submissions = community.metadata?.submissions || 0;

  return (
    <ThemeWrapper colors={community.colors}>
      <div className="p-6 bg-theme-primary text-theme-text lg:min-w-md lg:min-h-sm lg:h-full md:w-full md:h-60 lg:max-w-sm">
        <div className="mx-auto h-full">
          <div className="flex flex-col sm:flex-row justify-between lg:flex-col h-full">
            <div className="text-.5xl md:text-2xl font-medium md:max-w-sm sm:max-w-xs">
              <h1 className="tracking-tight max-w-text-xs text-theme-text">
                {community.name}
              </h1>
              <p className="tracking-tight max-w-text-2xs md:max-w-text-md text-theme-accent">
                {community.description || ""}
              </p>
            </div>
            <div className="self-end w-auto sm:h-full md:h-auto">
              <Image
                src={`/static${community.icon}`}
                className="relative h-44 w-44 mb-5"
                alt="Community icon"
                width={176}
                height={176}
              />
            </div>
          </div>
          <div className="flex md:flex-row lg:flex-col justify-start flex-col max-w-xs -mt-4 md:-mt-7 md:max-w-lg items-start">
            <div className="text-sm">
              <span>
                <strong>{submissions}</strong> submissions
              </span>
            </div>
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}
