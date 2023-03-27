import React, { useState, useEffect, ReactElement } from "react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

// TODO: IError interface to be moved to a central store for all interfaces
/**
 * Custom Error interface
 * @date 3/27/2023 - 5:13:31 PM
 *
 * @interface IError
 * @typedef {IError}
 * @extends {Error}
 */
interface IError extends Error {
  code?: string;
}

/**
 *  Notification component
 * @date 3/27/2023 - 5:13:21 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Notification(): ReactElement {
  const { t } = useTranslation();
  //TODO: (busy, setBusy) to be offloaded to the central store (redux)
  const [busy, setBusy] = useState(false);
  //TODO: (error, setError) to be offloaded to the central store (redux)
  const [error, setError] = useState<IError | null>(null);

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
