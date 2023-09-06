import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useSafePush = () => {
  const [onChanging, setOnChanging] = useState(false);
  const handleRouteChange = () => {
    setOnChanging(false);
  };
  const router = useRouter();
  const safePush = (path: string) => {
    if (onChanging) {
      return;
    }
    setOnChanging(true);
    router.push(path);
  };
  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router, setOnChanging]);
  return { safePush };
};

export default useSafePush;
