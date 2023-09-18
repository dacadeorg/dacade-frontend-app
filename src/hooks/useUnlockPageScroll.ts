import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "./useTypedDispatch";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";

const useUnlockPageScroll = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const unLockScroll = () => {
    return toggleBodyScrolling(false)(dispatch);
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", unLockScroll);
    return router.events.on("routeChangeComplete", unLockScroll);
  }, [router]);

  return unLockScroll;
};
export default useUnlockPageScroll;
