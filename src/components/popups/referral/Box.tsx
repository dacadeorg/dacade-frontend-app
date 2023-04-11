import { useState, useEffect, ReactElement } from "react";
import Button from "@/components/ui/button";
import { useTranslation } from "next-i18next";

/**
 * Box props interface
 * @date 4/4/2023 - 10:20:09 AM
 *
 * @interface BoxProps
 * @typedef {BoxProps}
 */
interface BoxProps {
  value?: string | null;
  label?: string | null;
}

/**
 * Box component
 * @date 4/4/2023 - 10:20:22 AM
 *
 * @export
 * @param {BoxProps} {
  value = null,
  label = null,
}
 * @returns {ReactElement}
 */
export default function Box({
  value = null,
  label = null,
}: BoxProps): ReactElement {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );

  /**
   * function to handle the click copy text to the clip board
   * @date 4/4/2023 - 10:20:48 AM
   *
   * @async
   * @returns {Promise<void>}
   */
  const copyToClipboard = async (): Promise<void> => {
    if (!navigator.clipboard) return;

    try {
      await navigator.clipboard.writeText(value || "");
      setCopied(true);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      setTimeoutId(
        setTimeout(() => {
          setCopied(false);
        }, 500)
      );
    } catch (error) {
      console.error("Failed to copy text: ", error);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className="relative flex items-center justify-between border border-solid p-2.5 text-gray-500 rounded border-gray-200 bg-gray-50">
      <div className="text-left flex-grow w-2/5 md:w-3/4">
        <label className="relative block text-xs md:text-sm">
          {label}
        </label>
        <div className="text-base md:text-lg mt-0.5 w-full truncate">
          {value}
        </div>
      </div>
      <div className="pl-3 flex-none">
        <Button
          variant={copied ? "primary" : "outline-primary"}
          onClick={copyToClipboard}
          type="button"
        >
          {t(
            copied
              ? "modal.referral.button.copied"
              : "modal.referral.button.copy"
          )}
        </Button>
      </div>
    </div>
  );
}
