import { useRouter } from "next/router";
import { useEffect, useState } from "react";

/**
 * UseSafePush hooks to implement safe router.push based on router events
 * to avoid multiple router.push() calls
 * @date 9/7/2023 - 6:10:25 PM
 *
 * @returns {{ safePush: (path: string) => void; }}
 */
const useSafePush = () => {
  const [isRouteChanging, setIsRouteChanging] = useState(false);
  const handleRouteChange = () => {
    setIsRouteChanging(false);
  };
  const router = useRouter();
  const safePush = (path: string) => {
    if (isRouteChanging) return;

    setIsRouteChanging(true);
    router.push(path);
  };
  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, setIsRouteChanging]);
  return { safePush };
};

export default useSafePush;
