/* eslint-disable @next/next/no-img-element */
import { ReactElement, useMemo } from "react";
import Checkmark from "@/icons/checkMarkIcon.svg";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from "@/hooks/useTypedSelector";
import classNames from "classnames";

interface AchievementCardProps {
  // TODO: The type should be improved after having a clear idea about the data type
  data: any;
  minting?: boolean;
}

export default function AchievementCard({ data, minting }: AchievementCardProps): ReactElement {
  const { t } = useTranslation();

  const router = useRouter();
  const authUser = useSelector((state) => state.user.data);
  const username = router.query.username || authUser?.displayName;

  const minted: boolean = !!data?.minting?.tx && data?.community?.can_mint_certificates;
  const mintable = data?.community?.can_mint_certificates;
  const badgeText = useMemo(() => {
    if (!mintable) return "Minting N/A";
    return !minted && !minting ? t("profile.achievement.mintable") : "NFT";
  }, [mintable, minted, minting, t]);

  const isNotCertificateIcon: boolean = data?.metadata?.image?.includes("/img/certificates/");

  return (
    <div className="border border-solid rounded-3.5xl pt-9 overflow-hidden w-full h-full">
      <Link href={`/achievements/${data.id}`} className="relative block h-full">
        <div className="flex flex-col h-full">
          <div className="flex-grow w-full mx-auto text-left px-7">
            <div
              className={`mx-auto relative rounded-full mb-5 ${!isNotCertificateIcon ? "w-20 h-20" : ""}`}
              style={{ backgroundColor: isNotCertificateIcon && data.community.colors.primary }}
            >
              <img src={data.metadata.image} alt="achievement" />
            </div>
            {!isNotCertificateIcon && <p className="text-sm font-medium text-center">{data.metadata.name}</p>}
          </div>

          <div
            className={classNames("rounded-b-3.5xl border-t border-solid mt-4 py-4 bort flex flex-none justify-center items-center space-x-1", {
              "bg-gray-100": minted,
              invisible: !mintable,
            })}
          >
            {minted && <Checkmark />}
            <p className="text-base font-normal text-center">{badgeText}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
