import { ReactElement } from "react";
import { IS_ARCHIVED } from "@/constants/archive";

/**
 * Banner telling visitors that Dacade is read-only.
 *
 * @returns {ReactElement} The rendered component.
 */
export default function ArchiveBanner(): ReactElement {
  if (!IS_ARCHIVED) return <></>;
  return (
    <div className="w-full bg-brand text-white text-center text-sm px-4 py-2">
      Dacade is now an archive. You can still browse all communities, challenges, submissions and feedback, but logging in and creating new content is no longer possible.
    </div>
  );
}
