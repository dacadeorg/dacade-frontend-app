/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useState } from "react";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import NavItem from "@/components/ui/NavItem";
import Avatar from "@/components/ui/Avatar";
import DateManager from "@/utilities/DateManager";
import AchievementViewItem from "@/components/sections/profile/achievements/ListItem";
import AchievementLinkField from "@/components/sections/profile/achievements/LinkField";
import { getMetadataTitle, getMetadataDescription } from "@/utilities/Metadata";
import ArrowButton from "@/components/ui/button/Arrow";
import { truncateAddress } from "@/utilities/Address";
import { IPFS_URL } from "@/constants/wallet";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { findCertificate } from "@/store/services/profile/certificate.service";
import { useTranslation } from "next-i18next";
import Logo from "@/icons/logo.svg";
import MintCertificate from "@/components/sections/profile/modals/MintCertificate";
import { Certificate } from "@/types/certificate";
import { User } from "@/types/bounty";
import { IRootState } from "@/store";

/**
 * interface for Achievement multiSelector
 * @date 9/13/2023 - 9:24:16 AM
 *
 * @interface AchievementMultiSelector
 * @typedef {AchievementMultiSelector}
 */
interface AchievementMultiSelector {
  achievement: Certificate | null;
  achievementMinted: boolean;
  user: User | null;
}

const Achievement = () => {
  const { t } = useTranslation();
  const { achievement, achievementMinted, user } = useMultiSelector<unknown, AchievementMultiSelector>({
    achievement: (state: IRootState) => state.profileCertificate.current,
    achievementMinted: (state: IRootState) => state.profileCertificate.currentMinted,
    user: (state: IRootState) => state.user.data,
  });
  const [showMintCertificate, setShowMintCertificate] = useState(false);
  const dispatch = useDispatch();
  const { locale, query } = useRouter();

  const findCertificateById = useCallback(async () => {
    await dispatch(findCertificate({ id: query.id as string }));
  }, [dispatch, query.id]);

  useEffect(() => {
    findCertificateById();
  }, [findCertificateById]);

  const issuedOn = useMemo(() => {
    if (!achievement?.metadata?.issuedOn) return null;
    return DateManager.intlFormat(achievement.metadata.issuedOn, locale, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }, [achievement, locale]);

  const backgroundColor = useMemo(() => {
    return achievement?.community?.colors?.primary;
  }, [achievement]);

  const minted = useMemo(() => {
    return !!achievement?.minting?.tx;
  }, [achievement]);

  const receiver = useMemo(() => {
    return truncateAddress(achievement?.minting?.receiver as string);
  }, [achievement]);

  const ipfsUrl = useMemo(() => {
    return IPFS_URL + achievement?.minting?.tokenURI;
  }, [achievement]);

  const txURL = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL}/tx/${achievement?.minting?.tx}`;
  }, [achievement]);

  const addressURL = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_BLOCK_EXPLORER_URL}/address/${achievement?.minting?.receiver}`;
  }, [achievement]);

  const metadataPreviewURL = useMemo(() => {
    return `${process.env.NEXT_PUBLIC_API_BASE_URL}/certificates/${achievement?.id}/metadata-preview`;
  }, [achievement]);

  const belongsToCurrentUser = useMemo(() => {
    if (!user) return false;
    return user.id === achievement?.user_id;
  }, [user, achievement]);

  const mintable = useMemo(() => {
    return achievement?.community?.can_mint_certificates;
  }, [achievement]);

  const isNotCertificateIcon = useMemo(() => {
    return !achievement?.metadata?.image?.includes("/img/certificates/");
  }, [achievement]);

  return (
    <>
      <Head>
        <title>{getMetadataTitle(achievement?.metadata?.title as string)}</title>
        {getMetadataDescription(achievement?.description as string).map((attributes, i) => (
          <meta key={`scoreboard-meta-${i}`} {...attributes} />
        ))}
      </Head>
      {achievement && (
        <div className="content-wrapper achievement-content mx-auto min-h-screen flex items-center py-16">
          <div className="w-full">
            <div className="flex flex-col md:flex-row border rounded-3xl">
              <div className="flex justify-center items-center p-7 md:rounded-l-3xl rounded-l-3xl w-full md:w-1/2 md:bg-none bg-gray-100">
                <div className={`h-52 w-52 ${isNotCertificateIcon && "p-12 rounded-full"}`} style={{ backgroundColor: isNotCertificateIcon ? backgroundColor : "" }}>
                  <img src={achievement?.metadata?.image} alt="certificate badge" />
                </div>
              </div>
              <div className="p-5 md:pt-7 md:px-7 md:pb-14 w-full md:w-1/2">
                <div>
                  <h2 className="font-medium leading-7 text-xl md:text-3xl mb-3 md:mb-1.5">{achievement?.metadata?.name}</h2>
                  <p className="text-gray-700 md:text-base text-sm">{achievement?.metadata?.narrative || achievement?.metadata?.description}</p>
                </div>
                <div className="mt-5 flex flex-col md:gap-6 gap-5">
                  <AchievementViewItem name={t("profile.achievement.award") as string}>
                    <div className="inline-flex items-center space-x-2 pr-3 bg-gray-200 p-1 rounded-full">
                      <Avatar user={user} size="small-fixed" hideVerificationBadge />
                      <p className="text-sm md:text-base">{achievement?.metadata?.recipientName}</p>
                    </div>
                  </AchievementViewItem>
                  <AchievementViewItem name={t("profile.achievement.issued") as string}>{achievement?.metadata?.issuerName}</AchievementViewItem>
                  <AchievementViewItem name={t("profile.achievement.date") as string}>{issuedOn}</AchievementViewItem>
                  {achievement?.metadata?.comment && (
                    <AchievementViewItem name={t("profile.achievement.comment") as string} mobileBlock={true} itemsStart={true}>
                      {achievement?.metadata?.comment}
                    </AchievementViewItem>
                  )}

                  {achievement?.metadata?.linkToWork && (
                    <AchievementViewItem name={t("profile.achievement.link") as string} mobileBlock={true}>
                      <AchievementLinkField link={achievement?.metadata?.linkToWork} />
                    </AchievementViewItem>
                  )}

                  {mintable && (
                    <div>
                      {belongsToCurrentUser && !minted && (
                        <AchievementViewItem name={t("profile.achievement.ipfs-metadata") as string}>
                          <a href={metadataPreviewURL} target="_blank" className="underline">
                            Preview
                          </a>
                        </AchievementViewItem>
                      )}

                      <div className="w-full flex">
                        {!achievementMinted && belongsToCurrentUser && <MintCertificate show={showMintCertificate} close={() => setShowMintCertificate(false)} />}

                        {belongsToCurrentUser && !minted && (
                          <ArrowButton target="__blank" variant="primary" className="flex ml-auto mt-5" onClick={() => setShowMintCertificate(true)}>
                            Mint certificate
                          </ArrowButton>
                        )}
                      </div>
                    </div>
                  )}
                  {minted && (
                    <div className="pt-5 mt-5 flex flex-col md:gap-3 gap-3 border-t border-t-solid">
                      <AchievementViewItem name={t("profile.achievement.issued-to") as string}>
                        <a href={addressURL} target="_blank" className="text-xs underline">
                          {receiver}
                        </a>
                      </AchievementViewItem>
                      <AchievementViewItem name={t("profile.achievement.mint-tx") as string}>
                        <a href={txURL} target="_blank" className="text-xs underline">
                          {achievement.minting.tx}
                        </a>
                      </AchievementViewItem>
                      <AchievementViewItem name={t("profile.achievement.ipfs-metadata") as string}>
                        <a href={ipfsUrl} target="_blank" className="text-xs underline">
                          {achievement.minting.tokenURI}
                        </a>
                      </AchievementViewItem>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="text-center pt-16">
              <ul className="relative">
                <NavItem type="logo" className="w-8 h-8 md:w-11 md:h-11">
                  <Logo />
                </NavItem>
                <NavItem type="brand mx-0.5">{t("app.name")}</NavItem>
              </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale as string)),
  },
});
export default Achievement;
