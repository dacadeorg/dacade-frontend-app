import { useGetUserQuery } from "@/store/services/user.service";
import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";

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
  const { isLoading, data } = useGetUserQuery("en");
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !data) router.replace("/login");
  }, [data, isLoading, router]);

  return <>{children}</>;
}
