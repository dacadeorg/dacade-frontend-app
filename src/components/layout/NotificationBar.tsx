import { useEffect, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useSelector } from "@/hooks/useTypedSelector";
import { setBusy, setError } from "@/store/feature/index.slice";

/**
 *  Notification component
 * @date 3/27/2023 - 5:13:21 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Notification(): ReactElement {
  const { t } = useTranslation();

  const { error, busy } = useSelector((state) => state.store);

  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => {
      if (error || busy) {
        setError(null);
        setBusy(false);
      }
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router.events, error, busy]);

  return (
    <div className="w-full flex justify-center">
      {error && (
        <div
          className="bg-red-50 border border-red-100 text-red-900 px-4 py-3 rounded-md relative w-full max-w-md justify-center flex"
          role="alert"
        >
          <span className="block sm:inline">
            {t(error.code || error.message)}
          </span>
        </div>
      )}
    </div>
  );
}
