import { ReactElement, useState } from "react";
import EthereumLogo from "@icons/partners/ethereum.svg";
import CeloLogo from "../../../public/assets/img/celo-logo.png";
import Image from "next/image";

const PARTNERS = [
  {
    logo: CeloLogo,
    link: "https://celo.org/",
  },
];

/**
 *  Communities component
 * @date 3/28/2023 - 9:13:40 PM
 *
 * @interface CommunitiesProps
 * @typedef {CommunitiesProps}
 */

interface CommunitiesProps {
  title: string;
}

/**
 *  Communities component
 * @date 3/28/2023 - 9:13:48 PM
 *
 * @export
 * @param {CommunitiesProps} {
  title = "",
}
 * @returns {ReactElement}
 */

export default function Communities({
  title = "",
}: CommunitiesProps): ReactElement {
  return (
    <div className="bg-gray-50 rounded-full pl-2 py-2 flex items-center mb-3">
      {PARTNERS.map((partner, index) => (
        <a
          href={partner.link}
          key={partner.link}
          target="__blank"
          className="inline-block md:mx-auto"
        >
          <div className="w-10 h-10 rounded-full border border-solid flex items-center">
            <Image
              src={partner.logo}
              className="mx-auto text-center flex items-center w-5"
              alt="Celo Logo"
            />
          </div>
        </a>
      ))}
      <p className="inline-block px-2">{title}</p>
      <div className="bg-orange text-orange_light text-sm border border-solid border-yellow-100 rounded px-3 py-0.5 inline-block mr-4">
        <span className="font-semibold"> 100 REP</span>
      </div>
    </div>
  );
}
