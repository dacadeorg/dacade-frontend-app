import { useDispatch } from "@/hooks/useTypedDispatch";
import { useSelector } from "@/hooks/useTypedSelector";
import { setForwardRoute } from "@/store/feature/index.slice";
import { fetchAllProfileCommunities } from "@/store/services/profile/profileCommunities.service";
import { fetchUserProfile } from "@/store/services/profile/users.service";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useMemo } from "react";

/**
 * This higher order component handle routing according to the user authentication state
 * @date 5/14/2023 - 11:52:29 AM
 *
 * @export
 * @param {{ children: ReactNode }} { children }
 * @returns {ReactElement}
 */
export default function RequireAuth({ children }: { children: ReactNode }): ReactElement {
  const router = useRouter();
  const route = router.asPath;
  const dispatch = useDispatch();
  const { auth, authUser, isFetchingUser } = useSelector((state) => ({
    authUser: state.user.data,
    auth: state.auth.data,
    isFetchingUser: state.user.fetchingUserLoading,
  }));

  function matchesRoutes(path: string, list: string[]) {
    const matches = list?.filter((el) => path?.startsWith(el));
    return matches?.length > 0;
  }

  const isUserRoute = useMemo(
    () => (path: string) => {
      return matchesRoutes(path, ["bounties", "profile/wallets", "profile/referrals", "profile/notifications"]);
    },
    []
  );

  const isGuestRoute = useMemo(
    () => (path: string) => {
      return matchesRoutes(path, ["/signup", "/login", "/password-reset"]);
    },
    []
  );

  useEffect(() => {
    if (route.startsWith("/verify-email") && auth && auth?.emailVerified) {
      router.push("/login");
      return;
    }

    if (route.startsWith("/notifications/email-unsubscribe")) return;
    if (auth && !auth.emailVerified && !route.startsWith("/email-verification")) {
      router.replace("/email-verification");
      return;
    }
    if (authUser && isGuestRoute(route)) {
      router.replace("/");
      return;
    }
    if (!authUser && isUserRoute(route)) {
      dispatch(setForwardRoute(route));
      router.replace("/login");
      return;
    }

    if (route.startsWith("/profile") && auth && auth.emailVerified) {
      dispatch(fetchUserProfile((router.query?.username as string) || ""));
      dispatch(fetchAllProfileCommunities((router.query?.username as string) || authUser?.displayName || ""));
    }
  }, [auth, authUser, dispatch, isGuestRoute, isUserRoute, route, router]);

  return <>{children}</>;
}
