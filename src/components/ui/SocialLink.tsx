import Image from "next/image";
import { ReactElement } from "react";
import DiscordIcon from "../../../public/assets/icons/discord.svg";
import TwitterIcon from "../../../public/assets/icons/twitter.svg";
import YoutubeIcon from "../../../public/assets/icons/youtube.svg";

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
export default function SocialLink({ link }: SocialLinkProps): ReactElement {
  const icons = {
    discord: DiscordIcon,
    twitter: TwitterIcon,
    youtube: YoutubeIcon,
  };

  const icon = icons[link?.icon as keyof typeof icons];

  return (
    <a
      href={link.url}
      target="__blank"
      title={link.title}
      className="h-14 w-14 border border-solid bg-gray-50 border-gray-200 box-border inline-flex items-center justify-center text-lg rounded-full"
    >
      {icon && (
        <div title={link.title} className="w-4.5 inline-block">
          <Image src={icon} alt="icon" />
        </div>
      )}
    </a>
  );
}
