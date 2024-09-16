import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";

/**
 * AchievementRedirect component
 *
 * This component redirects to a new url of the achiements page
 * It's just there to catch old links
 *
 * @returns {ReactElement}
 */

export default function AchievementRedirect(): ReactElement {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/achievements/${router.query.id}`);
  }, [router]);

  return <></>;
}
