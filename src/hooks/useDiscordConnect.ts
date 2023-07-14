import { useRouter } from "next/router";
import { useSelector } from "@/hooks/useTypedSelector";
import { useMemo } from "react";


const { NEXT_PUBLIC_DISCORD_OAUTH_BASE_URL, NEXT_PUBLIC_DISCORD_CLIENT_ID, NEXT_PUBLIC_DISCORD_SCOPE, NEXT_PUBLIC_DISCORD_CALLBACK_URL } = process.env;


export const useDiscordConnect = () => {
    const router = useRouter();
    const { authUser, profileUser } = useSelector((state) => ({
      authUser: state.user.data,
      profileUser: state.profile.user.current,
    }));
    const user = useMemo(() => {
      const username = (router.query?.username as string) || "";
      if (username && username?.toLowerCase() !== authUser?.displayName?.toLowerCase()) return profileUser;
      return authUser;
    }, [authUser, profileUser, router.query?.username]);
  
    const username = useMemo(() => user?.displayName, [user?.displayName]);
    const isCurrentUser = useMemo(() => username?.toLowerCase() === authUser?.displayName?.toLowerCase(), [authUser, username]);
    const canConnectDiscord = useMemo(() => isCurrentUser && !user?.discord?.connected, [isCurrentUser, user]);
  
    const triggerDiscordOauth = () =>
      (window.location.href = `${NEXT_PUBLIC_DISCORD_OAUTH_BASE_URL}?response_type=code&client_id=${NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=${NEXT_PUBLIC_DISCORD_SCOPE}&state=15773059ghq9183habn&redirect_uri=${NEXT_PUBLIC_DISCORD_CALLBACK_URL}&prompt=consent`);
  
        console.log("NEXT_PUBLIC_DISCORD_CALLBACK_URL", NEXT_PUBLIC_DISCORD_CALLBACK_URL)
        console.log("NEXT_PUBLIC_DISCORD_OAUTH_BASE_URL", NEXT_PUBLIC_DISCORD_OAUTH_BASE_URL)
        console.log("NEXT_PUBLIC_DISCORD_SCOPE", NEXT_PUBLIC_DISCORD_SCOPE)
        console.log("NEXT_PUBLIC_DISCORD_CALLBACK_URL", NEXT_PUBLIC_DISCORD_CALLBACK_URL)

      return {
        canConnectDiscord,
        triggerDiscordOauth
      }
}  