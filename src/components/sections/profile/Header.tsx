import { useMultiSelector } from "@/hooks/useTypedSelector";
import Avatar from "@/components/ui/Avatar";
import DateManager from "@/utilities/DateManager";
import Button from "@/components/ui/button";
import TimeIcon from "@/icons/time.svg";
// import GithubIcon from "@/icons/github.svg";
import DiscordIcon from "@/icons/discordIcon.svg";
import CompassIcon from "@/icons/compass.svg";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { openVerificationModal } from "@/store/feature/kyc.slice";
import KYCVerification from "@/components/popups/KYCVerification";
import { useDiscordConnect } from "@/hooks/useDiscordConnect";
import { User } from "@/types/bounty";
import { IRootState } from "@/store";

/**
 * interface for ProfileHeader multiSelector
 * @date 9/13/2023 - 9:16:05 AM
 *
 * @interface ProfileHeaderMultiSelector
 * @typedef {ProfileHeaderMultiSelector}
 */
interface ProfileHeaderMultiSelector {
  authUser: User | null;
  profileUser: User | null;
  isKycVerified: boolean;
}

/**
 * Profile header component
 *
 */
export default function ProfileHeader() {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();
  const { authUser, profileUser, isKycVerified } = useMultiSelector<unknown, ProfileHeaderMultiSelector>({
    authUser: (state: IRootState) => state.user.data,
    profileUser: (state: IRootState) => state.profileUser.current,
    isKycVerified: (state: IRootState) => state.user.data?.kycStatus === "VERIFIED",
  });

  const user = useMemo(() => {
    const username = (router.query?.username as string) || "";
    if (username && username?.toLowerCase() !== authUser?.displayName?.toLowerCase()) return profileUser;
    return authUser;
  }, [authUser, profileUser, router.query?.username]);

  const joined = useMemo(() => {
    if (!authUser?.joined) return null;
    return DateManager.format(authUser?.joined, "MMMM yyyy", locale);
  }, [authUser?.joined, locale]);

  const username = useMemo(() => user?.displayName, [user?.displayName]);

  const dispatch = useDispatch();
  const triggerKYCVerification = () => {
    dispatch(openVerificationModal({}));
  };

  const { canConnectDiscord, triggerDiscordOauth } = useDiscordConnect();
  const discordLink = !canConnectDiscord ? triggerDiscordOauth() : "https://discord.gg/U38KQHDtHe";

  const iconStyles = "inline-block";
  const linkStyles = "inline-block mx-1";

  return (
    <div className="relative pb-24 font-sans text-center">
      <Avatar size="extra" user={user} useLink={false} isKycVerified={isKycVerified} />
      <span className="block mt-5 text-5xl leading-none capitalize">{username}</span>
      <div className="flex justify-center mt-2 text-sm leading-snug divide-x divide-solid">
        <div className="flex items-center px-2">
          <span className={iconStyles}>
            <DiscordIcon />
          </span>
          <a href={discordLink} className={linkStyles + (canConnectDiscord ? " cursor-pointer hover:underline" : " hover:bg-primary")}>
            Discord
          </a>
        </div>
        {/* <div className="flex items-center justify-center px-2">
          <span>
            <GithubIcon />
          </span>
          <span className="mx-1">Github</span>
        </div> */}

        <div className="flex items-center justify-center px-2">
          <span>
            <TimeIcon />
          </span>
          <span className="mx-1">{t("profile.header.joined")}</span>
          {joined && <span className="text-sm">{joined}</span>}
        </div>

        {isKycVerified ? (
          <div className="flex items-center px-3">
            <span className="inline-block">
              <CompassIcon />
            </span>
            <span className="inline-block ml-1">Verified</span>
          </div>
        ) : (
          <></>
        )}
      </div>
      {canConnectDiscord && (
        <div className="pt-5 space-x-3">
          <Button variant="outline-primary" className="flex mx-auto text-base" onClick={triggerDiscordOauth}>
            {t("profile.header.connect-discord")}
          </Button>
          {!isKycVerified && (
            <Button variant="outline-primary" className="flex mx-auto text-base" onClick={triggerKYCVerification}>
              {t("profile.header.sumsub.verify")}
            </Button>
          )}
        </div>
      )}
      <KYCVerification />
    </div>
  );
}
