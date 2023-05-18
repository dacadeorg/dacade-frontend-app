import { useSelector } from "@/hooks/useTypedSelector";
import Avatar from "@/components/ui/Avatar";
import DateManager from "@/utilities/DateManager";
import Button from "@/components/ui/button";
import TimeIcon from "@/icons/time.svg";
import DiscordIcon from "@/icons/discordIcon.svg";
import KYCVerificationPopup from "@/components/layout/KYCVerification";
import CompassIcon from "@/icons/compass.svg";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useTranslation } from "next-i18next";

const ProfileHeader = () => {
  const router = useRouter();
  const { locale } = router;
  const { t } = useTranslation();
  const { authUser, profileUser, isKycVerified } = useSelector((state) => ({
    authUser: state.user.data,
    profileUser: state.profile.user.current,
    isKycVerified: state.user.data?.isKycVerified,
  }));

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
  const canConnectDiscord = useMemo(() => isCurrentUser && !user?.discord?.connected, [isCurrentUser, user]);
  const triggerDiscordOauth = () =>
    (window.location.href = `${process.env.NEXT_PUBLIC_DISCORD_OAUTH_BASE_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=${process.env.NEXT_PUBLIC_DISCORD_SCOPE}&state=15773059ghq9183habn&redirect_uri=${process.env.NEXT_PUBLIC_DISCORD_CALLBACK_URL}&prompt=consent`);

  const triggerKYCVerification = () => {
    // TODO: to be uncommented when kyc slice is implemented
    //   dispatch("kyc/openVerificationModal");
  };

  return (
    <div className="text-center font-sans pb-24 relative">
      <Avatar size="extra" user={user} useLink={false} />
      <span className="block capitalize text-5xl mt-5 leading-none">{username}</span>
      <div className="flex justify-center mt-2 leading-snug text-sm divide-x divide-solid">
        {!canConnectDiscord && (
          <div className="flex items-center px-2">
            <span className="inline-block">
              <DiscordIcon />
            </span>
            <span className="inline-block mx-1">Discord</span>
          </div>
        )}

        <div className="flex items-center px-2">
          <span className="inline-block">
            <TimeIcon />
          </span>
          <span className="inline-block mx-1">{t("profile.header.joined")}</span>
          {joined && <span className="inline-block text-sm">{joined}</span>}
        </div>

        {isKycVerified && (
          <div className="flex items-center px-3">
            <span className="inline-block">
              <CompassIcon />
            </span>
            <span className="ml-1 inline-block">Verified</span>
          </div>
        )}
      </div>
      {canConnectDiscord && (
        <div className="pt-5">
          <Button variant="outline-primary" className="flex mx-auto text-base" onClick={triggerDiscordOauth}>
          { t('profile.header.connect-discord') }
          </Button>
          {!isKycVerified && (
            <Button variant="outline-primary" className="flex mx-auto text-base" onClick={triggerKYCVerification}>
              { t('profile.header.sumsub.verify') }
            </Button>
          )}
        </div>
      )}
      <KYCVerificationPopup />
    </div>
  );
};

export default ProfileHeader;
