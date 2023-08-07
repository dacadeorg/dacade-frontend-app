import Loader from "@/components/ui/Loader";
import { useSelector } from "@/hooks/useTypedSelector";
import { authCheck, authVerify } from "@/store/feature/auth.slice";
import { useGetUserQuery } from "@/store/services/user.service";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { fetchAllCertificates } from "@/store/services/profile/certificate.service";
import { fetchProfileReputation } from "@/store/services/reputation.service";
import { useDispatch } from "@/hooks/useTypedDispatch";

/**
 * AuthChek provider
 *  - it wraps the profile page
 * @date 5/12/2023 - 5:38:18 PM
 *
 * @export
 * @param {{ children: ReactNode }} { children }
 * @returns {*}
 */
export default function AuthCheckProvider({ children }: { children: ReactNode }) {
  const { auth, authUser, isFetchingUser } = useSelector((state) => ({
    authUser: state.user.data,
    auth: state.auth.data,
    isFetchingUser: state.user.fetchingUserLoading,
  }));
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useGetUserQuery("en");
  useEffect(() => {
    (async () => {
      await Promise.all([dispatch(fetchAllCertificates({ username: authUser?.username || "" })), dispatch(fetchProfileReputation({ username: authUser?.username || "" }))]);
    })();
  }, [dispatch, router, isLoading, authUser]);

  if (isLoading) {
    return (
      <div className="relative h-screen w-screen overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 h-full w-full -translate-y-1/2 z-999 flex items-center justify-center bg-white">
          <Loader />
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
