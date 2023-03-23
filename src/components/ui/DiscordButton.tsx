import Image from "next/image";

export default function DiscordButton() {
  return (
    <a
      className="fixed bottom-5 right-5 z-999 md:w-16 w-14 cursor-pointer"
      href="https://discord.gg/eHYZr9dzan"
      target="_blank"
    >
      <Image
        priority
        unoptimized
        fill
        src="/assets/icons/discordButton.svg"
        alt="Discord"
      />
    </a>
  );
}
