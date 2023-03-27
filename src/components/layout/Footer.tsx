import React, { ReactElement, useState } from "react";
import Section from "@/components/ui/Section";
import SocialLink from "@/components/ui/SocialLink";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { GetStaticProps } from "next";
import i18Translate from "@/utilities/I18Translate";
import Image from "next/image";
import ApeUnitLogo from "../../../public/assets/icons/partners/apeunit.svg";
import OctanLogo from "../../../public/assets/icons/partners/octan.svg";
import CeloLogo from "../../../public/assets/icons/partners/celo.svg";

interface Props {
  backgroundColor?: boolean;
}

export default function Footer({
  backgroundColor,
}: Props): ReactElement {
  const { t } = useTranslation();

  const [socialLinks] = useState([
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
  ]);
  const [partners] = useState([
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
  ]);

  return (
    <Section
      padding="pt-20"
      type={backgroundColor ? "secondary-light" : "default"}
    >
      <div className="py-8 text-base text-center text-gray-400 border-t border-gray-200 border-t-solid lg:flex md:flex lg:text-left">
        <div className="w-full border-b border-gray-200 lg:w-1/2 lg:border-none md:border-none border-b-solid">
          <p
            className="block text-with-links"
            v-html={t("footer.text")}
          />
          <div className="flex items-center justify-center mt-8 mb-12 lg:mb-0 lg:justify-start space-x-9">
            {partners.map((partner, i) => (
              <Link
                key={i}
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
            {socialLinks.map((link, i) => (
              <SocialLink key={i} link={link} />
            ))}
          </div>
          <p className="mt-8.5">
            <Link
              href="localePath('/privacy-policy')"
              target="__blank"
            >
              {t("footer.privacy-policy")}
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
