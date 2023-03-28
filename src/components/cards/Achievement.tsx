import React, { ReactElement, useMemo } from "react";
// import { useSelector } from "react-redux";
import Checkmark from "@/icons/checkMarkIcon.svg";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "react-i18next";

interface AchievementCardProps {
  // TODO: The type should be improved after having a clear idea about the data type
  data: any;
  minting: boolean;
}

export default function AchievementCard({
  data,
  minting,
}: AchievementCardProps): ReactElement {
  const { t } = useTranslation();

  // TODO: These lines should be uncommented when the redux is implemented
  // const router = useRouter();
  //   const authUser = useSelector((state) => state.user.get);
  //   const username = router.query.username || authUser?.displayName;

  const minted: boolean =
    !!data?.minting?.tx && data?.community?.can_mint_certificates;

  const mintable = data?.community?.can_mint_certificates;

  const badgeText = useMemo(() => {
    if (!mintable) {
      return "Minting N/A";
    }

    return !minted && !minting
      ? t("profile.achievement.mintable")
      : "NFT";
  }, [mintable, minted, minting, t]);

  const isSVG: boolean =
    data?.metadata?.image?.includes(".svg") || false;

  return (
    <div className="border border-solid rounded-3.5xl pt-9 overflow-hidden w-full h-full">
      <Link
        href={`/achievements/${data.id}`}
        className="block h-full relative"
      >
        <div className="h-full flex flex-col">
          <div className="mx-auto flex-grow w-full text-left px-7">
            <div
              className={`mx-auto rounded-full mb-5 ${
                isSVG ? "w-20 h-20 p-5" : ""
              }`}
              style={{
                backgroundColor:
                  isSVG && data.community.colors.primary,
              }}
            >
              <Image
                src={data.metadata.image}
                className="relative"
                alt="image"
              />
            </div>
            {isSVG && (
              <p className="text-sm font-medium text-center">
                {data.metadata.name}
              </p>
            )}
          </div>
          <div
            className={`rounded-b-3.5xl border-t border-solid mt-4 py-4 bort flex flex-none justify-center items-center space-x-1 ${
              minted ? "bg-gray-100" : "invisible"
            }`}
          >
            {minted && <Checkmark />}
            <p className="text-base text-center font-normal">
              {badgeText}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
