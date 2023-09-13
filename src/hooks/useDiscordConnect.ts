import { useRouter } from "next/router";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { useMemo } from "react";
import { User } from "@/types/bounty";
import { IRootState } from "@/store";

/**
 * interface for UseDiscordConnect multiSelector
 * @date 9/13/2023 - 9:22:05 AM
 *
 * @interface useDiscordConnectMultiSelector
 * @typedef {useDiscordConnectMultiSelector}
 */
interface useDiscordConnectMultiSelector {
  authUser: User | null;
  profileUser: User | null;
}

export const useDiscordConnect = () => {
  const router = useRouter();
  const { authUser, profileUser } = useMultiSelector<unknown, useDiscordConnectMultiSelector>({
    authUser: (state: IRootState) => state.user.data,
    profileUser: (state: IRootState) => state.profile.user.current,
  });
  const user = useMemo(() => {
    const username = (router.query?.username as string) || "";
    if (username && username?.toLowerCase() !== authUser?.displayName?.toLowerCase()) return profileUser;
    return authUser;
  }, [authUser, profileUser, router.query?.username]);

  const username = useMemo(() => user?.displayName, [user?.displayName]);
  const isCurrentUser = useMemo(() => username?.toLowerCase() === authUser?.displayName?.toLowerCase(), [authUser, username]);
  const canConnectDiscord = useMemo(() => isCurrentUser && !user?.discord?.connected, [isCurrentUser, user]);

  const NEXT_PUBLIC_DISCORD_CALLBACK_URL = process.env.NEXT_PUBLIC_DISCORD_CALLBACK_URL;
  const NEXT_PUBLIC_DISCORD_OAUTH_BASE_URL = process.env.NEXT_PUBLIC_DISCORD_OAUTH_BASE_URL;
  const NEXT_PUBLIC_DISCORD_SCOPE = process.env.NEXT_PUBLIC_DISCORD_SCOPE;
  const NEXT_PUBLIC_DISCORD_CLIENT_ID = process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID;

  const triggerDiscordOauth = () =>
    (window.location.href = `${NEXT_PUBLIC_DISCORD_OAUTH_BASE_URL}?response_type=code&client_id=${NEXT_PUBLIC_DISCORD_CLIENT_ID}&scope=${NEXT_PUBLIC_DISCORD_SCOPE}&state=15773059ghq9183habn&redirect_uri=${NEXT_PUBLIC_DISCORD_CALLBACK_URL}&prompt=consent`);

  return {
    canConnectDiscord,
    triggerDiscordOauth,
  };
};
