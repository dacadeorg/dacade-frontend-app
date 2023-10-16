import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { User, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { auth } from "@/config/firebase";
import { setAuthData, setIsAuthLoading } from "@/store/feature/auth.slice";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { fetchUser } from "@/store/services/user.service";
import { getToken } from "@/store/feature/user.slice";
import { useRouter } from "next/router";
import { clearError } from "@/store/feature/index.slice";
import { fetchUserProfile } from "@/store/services/profile/users.service";
import { fetchAllProfileCommunities } from "@/store/services/profile/profileCommunities.service";
import { setListProfileCommunities } from "@/store/feature/profile/communities.slice";
import Loader from "@/components/ui/Loader";
import { useSelector } from "@/hooks/useTypedSelector";
import { AUTH_TOKEN } from "@/constants/localStorage";

const UserAuthContext = createContext(null);

export default function AuthObserver({ children }: { children: ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const route = router.asPath;
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.data);
  function matchesRoutes(path: string, routes: string[]) {
    const matches = routes?.filter((route) => path === route);
    return matches?.length > 0;
  }

  const isUserRoute = useMemo(
    () => (path: string) => {
      return matchesRoutes(path, ["/bounties", "/profile", "/profile/wallets", "/profile/referrals", "/profile/settings", "/profile/notifications"]);
    },
    []
  );

  const isGuestRoute = useMemo(
    () => (path: string) => {
      return matchesRoutes(path, ["/signup", "/password-reset"]);
    },
    []
  );

  const emailVerificationChecker: (auth: User | null) => Promise<void> = useCallback(
    async (auth: User | null) => {
      if (route.startsWith("/verify-email") && auth?.emailVerified) {
        await router.push("/");
        return;
      }

      if (route.startsWith("/email-verification") && !auth) {
        await router.push("/");
        return;
      }

      if (auth && !auth.emailVerified && !route.startsWith("/email-verification")) {
        await router.replace("/email-verification");
        return;
      }
    },
    [route, router]
  );

  const guestAndUserRoutesChecker = useCallback(
    async (auth: User | null) => {
      if (auth && isGuestRoute(route)) {
        await router.replace("/");
        return;
      }

      if (!auth && isUserRoute(route)) {
        await router.replace("/login");
        return;
      }

      if (route.startsWith("/profile") && auth && auth.emailVerified) {
        const username = (router.query.username as string) || user?.username || "";
        if (username) {
          dispatch(fetchUserProfile(username));
          dispatch(fetchAllProfileCommunities(auth?.displayName || ""));
        }
      }

      if (route.startsWith("/profile")) {
        const { data } = await dispatch(fetchAllProfileCommunities((router.query?.username || auth?.displayName) as string));
        dispatch(setListProfileCommunities(data));
      }
    },
    [dispatch, isGuestRoute, isUserRoute, route, router]
  );

  useEffect(() => {
    onIdTokenChanged(auth, async (user) => {
      dispatch(setAuthData(user?.toJSON()));
      localStorage.setItem(AUTH_TOKEN, (await user?.getIdToken()) ?? "");
      await dispatch(getToken());
    });

    onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      dispatch(setIsAuthLoading(true));
      await emailVerificationChecker(user);
      await guestAndUserRoutesChecker(user);
      dispatch(setAuthData(user?.toJSON()));
      await dispatch(fetchUser());
      setLoading(false);
      dispatch(setIsAuthLoading(false));
    });
  }, [dispatch, emailVerificationChecker, guestAndUserRoutesChecker]);

  useEffect(() => {
    dispatch(clearError());
  }, [router.pathname]);

  if (loading && !user && (isGuestRoute(route) || isUserRoute(route))) {
    return (
      <div className="fixed h-screen w-screen overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-full w-full -translate-y-1/2 z-999 flex items-center justify-center bg-white">
          <Loader />
        </div>
      </div>
    );
  }

  return <UserAuthContext.Provider value={null}>{children}</UserAuthContext.Provider>;
}
