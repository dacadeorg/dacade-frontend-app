import { Challenge as ChallengeTypes } from "@/types/course";
import { ReactElement } from "react-markdown/lib/react-markdown";

/**
 * Expiration date component
 * @date 7/31/2023 - 10:04:36 AM
 *
 * @export
 * @param {string} { expiresAt }
 * @returns {ReactElement}
 */
export default function ExpiryDate({ expiresAt }: { expiresAt: string }): ReactElement {
  return (
    <div className="bg-gray-50 py-6 px-3 md:py-9 md:px-3 border rounded border-solid border-gray-200 flex items-center justify-start md:justify-center my-5">
      <p className="text-gray-700 flex md:flex-col items-center gap-1 text-sm">
        Challenge expiry date:
        <span className="font-medium text-center">{expiresAt}</span>
      </p>
    </div>
  );
}
