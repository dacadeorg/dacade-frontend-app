/* eslint-disable @next/next/no-img-element */
import { ReactElement } from "react";

import Link from "next/link";
import { Certificate } from "@/types/certificate";

/**
 * Achievement card props interface
 * @date 5/21/2023 - 10:05:34 PM
 *
 * @interface AchievementCardProps
 * @typedef {AchievementCardProps}
 */
interface AchievementCardProps {
  data: Certificate | null;
  minting?: boolean;
}

export default function AchievementCard({ data }: AchievementCardProps): ReactElement {
  
 

  const isNotCertificateIcon: boolean = !!data?.metadata?.image?.includes("/img/certificates/");

  return (
    <div className="border border-solid rounded-4xl pt-9 overflow-hidden w-full h-full">
      <Link href={`/achievements/${data?.id}`} className="relative block h-full">
        <div className="flex flex-col h-full">
          <div className="flex-grow w-full mx-auto text-left px-7">
            <div className="min-h-2xs">
            <div
              className={`mx-auto relative rounded-full mb-5 ${!isNotCertificateIcon ? "w-20 h-20" : ""}`}
              style={{ backgroundColor: isNotCertificateIcon ? data?.community.colors?.cover?.background || data?.community.colors.primary : "" }}
            >
              <img src={data?.metadata?.image} alt="achievement" />
            </div>
            </div>
            
             <p className="text-sm font-medium text-center pb-5">{data?.metadata?.name}</p>
          </div>

          {/* <div
            className={classNames("rounded-b-3.5xl border-t border-solid mt-4 py-4 bort flex flex-none justify-center items-center space-x-1", {
              "bg-gray-100": minted,
              invisible: !mintable,
            })}
          >
            {minted && <Checkmark />}
            <p className="text-base font-normal text-center">{badgeText}</p>
          </div> */}
        </div>
      </Link>
    </div>
  );
}
