import Link from "next/link";
import { ReactElement, useMemo } from "react";
import ChevronRightIcon from "@/icons/chevron-right.svg";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * CommunityNavigation component interface
 * @date 4/18/2023 - 12:24:08 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function CommunityNavigation(): ReactElement {
  const community = useSelector((state) => state.communities?.current);

  const course = useSelector((state) => state.courses?.current);

  const path = useMemo(() => (community ? `/communities/${community.slug}` : ""), [community]);

  const submissions = useMemo(() => {
    if (community && community.metadata && community.metadata.submissions) {
      return community.metadata.submissions;
    }
    return 0;
  }, [community]);

  const feedbacks = useMemo(() => {
    if (community && community.metadata && community.metadata.feedbacks) {
      return community.metadata.feedbacks;
    }
    return 0;
  }, [community]);
  return community && course ? (
    <div>
      <div className="relative flex items-center py-4 pt-4 text-sm border-b-2 md:pt-7 lg:border-0">
        <div className="leading-none text-gray-500">
          <Link href={path}>{community.name}</Link>
        </div>
        <div className="px-0.5">
          <ChevronRightIcon viewBox="0 0 20 20" className="w-3 h-3" />
        </div>
        <div className="font-medium leading-none">{course.name}</div>
      </div>
    </div>
  ) : (
    <></>
  );
}
