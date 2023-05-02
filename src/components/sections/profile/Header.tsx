import { useSelector } from "@/hooks/useTypedSelector";
import Avatar from "@/components/ui/Avatar";
import DateManager from "@/utilities/DateManager";
import Button from "@/components/ui/button";
import TimeIcon from "@/icons/time.svg";
import DiscordIcon from "@/icons/discordIcon.svg";
import KYCVerificationPopup from "@/components/layout/KYCVerification";
import CompassIcon from "@/icons/compass.svg";
import { useDispatch } from "react-redux";

const ProfileHeader = () => {
  const dispatch = useDispatch();
  //   const authUser = useSelector((state) => state.user.get);
  //   const profileUser = useSelector(
  //     (state) => state.profile.users.current
  //   );
  const profileUser = {
    displayName: "mbukeprince",
    joined: "2021",
    discord: {
      connected: true,
    },
  };
  const authUser = {
    displayName: "mbukeprince",
    joined: "2021",
    discord: {
      connected: true,
    },
  };
  const isKycVerified = true;
  const joined = "2021";
  const user = {
    displayName: "mbukeprince",
    joined: "2021",
    discord: {
      connected: true,
    },
  };

  //   const isKycVerified = useSelector((state) => state.user.isKycVerified);

  //   const joined = () => {
  //     if (!user?.joined) return null;
  //     return DateManager.format(user?.joined, 'MMMM yyyy', 'en');
  //   };

  //   const user = () => {
  //     if (
  //       route.params?.username &&
  //       route.params?.username?.toLowerCase() !== authUser?.displayName?.toLowerCase()
  //     ) {
  //       return profileUser;
  //     }
  //     return authUser;
  //   };

  //   const username = () => {
  //     return user?.displayName;
  //   };

  //   const isCurrentUser = () => {
  //     return (
  //       username?.toLowerCase() === authUser?.displayName?.toLowerCase()
  //     );
  //   };

  const isCurrentUser = true;

  //   const canConnectDiscord = () => {
  //     return isCurrentUser && !user?.discord?.connected;
  //   };

  const triggerDiscordOauth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_DISCORD_OAUTH_BASE_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=${process.env.NEXT_PUBLIC_DISCORD_SCOPE}&state=15773059ghq9183habn&redirect_uri=${process.env.NEXT_PUBLIC_DISCORD_CALLBACK_URL}&prompt=consent`;
  };

  const triggerKYCVerification = () => {
    console.log("Hello world!");
    //   dispatch("kyc/openVerificationModal");
  };
  const canConnectDiscord = true;
  const username = "Mbuke prince";

  return (
    <div className="text-center font-sans pb-24 relative">
      <Avatar size="extra" user={user} use-link={false} />
      <span className="block capitalize text-5xl mt-5 leading-none">
        {username}
      </span>
      <div className="flex justify-center mt-2 leading-snug text-sm divide-x divide-solid">
        <div className="flex items-center px-2">
          <span className="inline-block">
            <TimeIcon />
          </span>
          <span className="inline-block mx-1">Joined</span>
          <span className="inline-block text-sm">{joined}</span>
        </div>
        <div className="flex items-center px-2">
          <span className="inline-block">
            <DiscordIcon />
          </span>
          <span className="inline-block mx-1">Discord</span>
        </div>
        <div className="flex items-center px-3">
          <span className="inline-block">
            <CompassIcon />
          </span>
          <span className="ml-1 inline-block">Verified</span>
        </div>
      </div>
      {canConnectDiscord && (
        <div className="pt-5">
          <Button
            variant="outline-primary"
            className="flex mx-auto text-base"
            onClick={triggerDiscordOauth}
          >
            Connect Discord
          </Button>
          {!isKycVerified && (
            <Button
              variant="outline-primary"
              className="flex mx-auto text-base"
              onClick={triggerKYCVerification}
            >
              Verify
            </Button>
          )}
        </div>
      )}
      <KYCVerificationPopup
        onCompleted={() => console.log("Hello world")}
        key="Hello world"
      />
    </div>
  );
};

export default ProfileHeader;
