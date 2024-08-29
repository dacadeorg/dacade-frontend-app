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
import { KYCSTATUS, openVerificationModal } from "@/store/feature/kyc.slice";
import KYCVerification from "@/components/popups/KYCVerification";
import { useDiscordConnect } from "@/hooks/useDiscordConnect";
import { User } from "@/types/bounty";
import { IRootState } from "@/store";
import Link from "next/link";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";

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
    isKycVerified: (state: IRootState) => state.user.data?.kycStatus === KYCSTATUS.VERIFIED,
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

  const isCurrentUser = useMemo(() => username?.toLowerCase() === authUser?.displayName?.toLowerCase(), [authUser, username]);

  const showKycVerificationButton = useMemo(() => {
    return isCurrentUser && !isKycVerified;
  }, [isCurrentUser, isKycVerified]);

  const dispatch = useDispatch();

  const triggerKYCVerification = () => {
    dispatch(openVerificationModal({}));
    dispatch(toggleBodyScrolling(true));
  };

  const { canConnectDiscord, triggerDiscordOauth } = useDiscordConnect();
  const discordLink = "https://discord.gg/U38KQHDtHe";

  const iconStyles = "inline-block";

  return (
    <div className="relative pb-24 font-sans text-center">
      <Avatar size="extra" user={user} useLink={false} isKycVerified={isKycVerified} />
      <span className="block mt-5 text-5xl leading-none capitalize">{username}</span>
      <div className="flex justify-center mt-2 text-sm leading-snug divide-x divide-solid">
        {!canConnectDiscord ? (
          <div className="flex items-center px-2">
            <span className={iconStyles}>
              <DiscordIcon />
            </span>
            <Link href={discordLink} className="inline-block mx-1 cursor-pointer hover:underline" target="_blank">
              Discord
            </Link>
          </div>
        ) : (
          <></>
        )}
        {/* TODO: Will be uncommented when there is proper implementation for adding GitHub */}
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
      <div className="pt-5 space-x-3">
        {canConnectDiscord && (
          <Button variant="outline-primary" className="flex mx-auto text-base" onClick={triggerDiscordOauth}>
            {t("profile.header.connect-discord")}
          </Button>
        )}
        {!isKycVerified && showKycVerificationButton && (
          <Button variant="outline-primary" className="flex mx-auto text-base" onClick={triggerKYCVerification}>
            {t("profile.header.sumsub.verify")}
          </Button>
        )}
      </div>
      <KYCVerification />
    </div>
  );
}
