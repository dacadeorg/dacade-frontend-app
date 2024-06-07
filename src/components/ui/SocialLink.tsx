import { ReactElement } from "react";
import DiscordIcon from "@/icons/discord.svg";
import TwitterIcon from "@/icons/twitter.svg";
import YoutubeIcon from "@/icons/youtube.svg";
import LinkedinIcon from "@/icons/linkedin.svg";

/**
 * Interface for Props component props for SocialLink
 * @date 3/22/2023 - 5:48:27 PM
 *
 * @interface Props
 * @typedef {Props}
 */
interface SocialLinkProps {
  link: {
    url: string;
    title: string;
    icon: string;
  };
  testId?: string;
  socialLinkIconTestId?: string;
}

/**
 *  SocialLink component
 * @date 3/22/2023 - 5:48:53 PM
 *
 * @param {{ link: {
 *    url: string;
 *    title: string;
 *    icon: string; }; }} { link }
 * @returns {ReactElement}
 */
export default function SocialLink({ link, testId = "socialLink", socialLinkIconTestId = "socialLink-icon" }: SocialLinkProps): ReactElement {
  const icons = {
    discord: <DiscordIcon data-testid="discordIcon" />,
    twitter: <TwitterIcon data-testid="twitterIcon" />,
    youtube: <YoutubeIcon data-testid="youtubeIcon" />,
    linkedin: <LinkedinIcon />,
  };

  const icon = icons[link?.icon as keyof typeof icons];

  return (
    <a
      data-testid={testId}
      href={link.url}
      target="_blank"
      title={link.title}
      className="h-14 w-14 border border-solid bg-surface-bg-secondary border-surface-border-primary box-border inline-flex items-center justify-center text-lg rounded-full"
    >
      {icon && (
        <div title={link.title} className="w-4.5 inline-block" data-testid={socialLinkIconTestId}>
          {icon}
        </div>
      )}
    </a>
  );
}
