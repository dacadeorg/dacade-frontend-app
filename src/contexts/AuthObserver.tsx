import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";
import { User, getIdToken, onAuthStateChanged, onIdTokenChanged } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { setAuthData, setIsAuthLoading, setIsVerificationInProgress } from "@/store/feature/auth.slice";
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
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.data);
  const isVerificationInProgress = useSelector((state) => state.auth.isVerificationInProgress);
  const [changed, setChanged] = useState(false);
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
        console.log("found ourlseves here", auth);
        const token = await getIdToken(auth);
        const user = getAuth();
        console.log({ user, token });
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

  const doStuff = useCallback(async () => {
    console.log("doing the stuff");
    const user = getAuth()?.currentUser;
    if (user) {
      setLoading(true);
      dispatch(setIsAuthLoading(true));
      await emailVerificationChecker(user);
      await guestAndUserRoutesChecker(user);
      dispatch(setAuthData(user?.toJSON()));
      await dispatch(fetchUser());
      setLoading(false);
      dispatch(setIsAuthLoading(false));
    }
  }, [dispatch, emailVerificationChecker, guestAndUserRoutesChecker]);

  const checkIfChanged = async (user: User | null) => {
    //  TODO: because when you log out, we have nothing in the local storage, so this won't be wise.
    const localToken = localStorage.getItem(AUTH_TOKEN);
    const newToken = await user?.getIdToken();
    if (newToken && localToken) setChanged(localToken !== newToken);
    else {
      setChanged(true); //so that we don't continue fetching
    }
  };

  useEffect(() => {
    onIdTokenChanged(getAuth(), async (user) => {
      dispatch(setAuthData(user?.toJSON()));
      localStorage.setItem(AUTH_TOKEN, (await user?.getIdToken()) ?? "");
      await dispatch(getToken());
    });

    onAuthStateChanged(getAuth(), async (user) => {
      checkIfChanged(user);
      if (user) {
        if (user.emailVerified) {
          checkIfChanged(user);
          dispatch(setIsVerificationInProgress(false));
        } else {
          if (isVerificationInProgress) {
            emailVerificationChecker(user);
          }
        }
      } else {
        console.log("we have no user as of now");
      }

      // chech the verification
      // if we have the auth and is verified, then go ahead and check if changed ✅
      // if we have the auth and not verified then check if the verification is on the way\
      // if the verification is not on the way then set it on the way and then call the emailverificatiochecker, then the verification will be set to false, when the verification is done.
    });
  }, [dispatch, emailVerificationChecker, guestAndUserRoutesChecker]);

  useEffect(() => {
    dispatch(clearError());
  }, [router.pathname]);

  useEffect(() => {
    if (changed) {
      doStuff();
    } else {
    }
  }, [changed, doStuff]);

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
