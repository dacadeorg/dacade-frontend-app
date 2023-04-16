import { ReactElement, useCallback } from "react";
import Section from "@/components/ui/Section";
import SocialLink from "@/components/ui/SocialLink";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import ApeUnitLogo from "@/icons/partners/apeunit.svg";
import OctanLogo from "@/icons/partners/octan.svg";
import CeloLogo from "@/icons/partners/celo.svg";

interface FooterProps {
  backgroundColor?: boolean | string;
}

/**
 * Dacade's partners
 * @date 3/27/2023 - 5:34:38 PM
 */
const socialLinks = [
  {
    title: "Discord",
    url: "https://discord.gg/U38KQHDtHe",
    icon: "discord",
  },
  {
    title: "Twitter",
    url: "https://twitter.com/dacadeorg",
    icon: "twitter",
  },
  {
    title: "Youtube",
    url: "https://www.youtube.com/channel/UC08wXfDvuqBJvuZfNZkv3xQ",
    icon: "youtube",
  },
];

/**
 * Dacade's partners
 * @date 3/27/2023 - 5:34:38 PM
 */
const partners = [
  {
    name: "ApeUnit",
    url: "https://apeunit.com",
    logo: ApeUnitLogo,
  },
  {
    name: "Octan Group",
    url: "https://octan.group/",
    logo: OctanLogo,
  },
  {
    name: "Celo",
    url: "https://celo.org",
    logo: CeloLogo,
  },
];

/**
 * The application footer that contains socials and partners.
 * @date 3/27/2023 - 5:26:28 PM
 *
 * @export
 * @param {FooterProps} {
  backgroundColor,
}
 * @returns {ReactElement}
 */
export default function Footer({
  backgroundColor,
}: FooterProps): ReactElement {
  const { t } = useTranslation();

  const getFooterTheme = useCallback(() => {
    let theme;
    switch (backgroundColor) {
      case true:
        theme = "secondary";
        break;
      case false:
        theme = "";
        break;
      default:
        theme = backgroundColor;
        break;
    }
    return theme;
  }, [backgroundColor]);

  return (
    <Section padding="pt-20" type={getFooterTheme()}>
      <div className="py-8 text-base text-center text-gray-400 border-t border-gray-200 border-t-solid lg:flex md:flex lg:text-left">
        <div className="w-full border-b border-gray-200 lg:w-1/2 lg:border-none md:border-none border-b-solid">
          <p
            className="block text-with-links"
            dangerouslySetInnerHTML={{ __html: t("footer.text") }}
          />
          <div className="flex items-center justify-center mt-8 mb-12 lg:mb-0 lg:justify-start space-x-9">
            {partners.map((partner) => (
              <Link
                key={partner.name}
                href={partner.url}
                title={partner.name}
                target="__blank"
                className="inline-block"
              >
                <partner.logo />
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full mt-6 lg:w-1/2 md:mt-0 lg:text-right">
          <div className="space-x-2">
            {socialLinks.map((link) => (
              <SocialLink key={link.title} link={link} />
            ))}
          </div>
          <p className="mt-8.5">
            <Link href="/privacy-policy" target="__blank">
              {t("footer.privacy-policy")}
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
