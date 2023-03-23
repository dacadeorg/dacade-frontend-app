import DiscordButtonIcon from "../../../public/assets/icons/discordButton.svg";

/**
 * Discord Button Component
 * @date 3/23/2023 - 6:21:06 PM
 *
 * @export
 * @returns {*}
 */
export default function DiscordButton() {
  return (
    <a
      className="fixed- bottom-5 right-5 z-999 md:w-16 w-14 cursor-pointer"
      href="https://discord.gg/eHYZr9dzan"
      target="_blank"
    >
      <DiscordButtonIcon />
    </a>
  );
}
