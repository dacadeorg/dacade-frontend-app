import Link from "next/link";
import React, { useMemo } from "react";
import ChevronRightIcon from "@/icons/chevron-right.svg";
import { useSelector } from "@/hooks/useTypedSelector";

export default function CommunityNavigation() {
  const community = useSelector((state) => state.communities.current);

  const course = useSelector((state) => state.courses.current);

  const path = useMemo(
    () => (community ? `/communities/${community.slug}` : ""),
    [community]
  );

  const submissions = useMemo(() => {
    if (
      community &&
      community.metadata &&
      community.metadata.submissions
    ) {
      return community.metadata.submissions;
    }
    return 0;
  }, [community]);

  const feedbacks = useMemo(() => {
    if (
      community &&
      community.metadata &&
      community.metadata.feedbacks
    ) {
      return community.metadata.feedbacks;
    }
    return 0;
  }, [community]);
  return community && course ? (
    <div>
      <div className="text-sm relative pt-4 py-4 md:pt-7 lg:border-0 border-b-2 flex items-center">
        <div className="text-gray-500 leading-none">
          <Link href={path}>{community.name}</Link>
        </div>
        <div className="px-0.5">
          <ChevronRightIcon viewBox="0 0 20 20" className="w-3 h-3" />
        </div>
        <div className="font-medium leading-none">{course.name}</div>
      </div>
    </div>
  ) : null;
}
