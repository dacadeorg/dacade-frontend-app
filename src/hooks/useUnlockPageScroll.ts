import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "./useTypedDispatch";
import { toggleBodyScrolling } from "@/store/feature/ui.slice";

/**
 * useUnlockPageScroll custom hook to unlock scroll on router change Complete
 * @date 9/19/2023 - 8:59:08 AM
 *
 * @returns {() => any}
 */
export default function useUnlockPageScroll() {
  const router = useRouter();
  const dispatch = useDispatch();
  const unLockScroll = () => toggleBodyScrolling(false)(dispatch);

  useEffect(() => {
    router.events.on("routeChangeComplete", unLockScroll);
    return router.events.off("routeChangeComplete", unLockScroll);
  }, [router]);

  return unLockScroll;
}
