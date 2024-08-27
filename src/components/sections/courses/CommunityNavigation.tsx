import Link from "next/link";
import { Fragment, ReactElement, useMemo } from "react";
import ChevronRightIcon from "@/icons/chevron-right.svg";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * CommunityNavigation component interface
 * @date 4/18/2023 - 12:24:08 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function CommunityNavigation({ paths }: { paths?: string[] }): ReactElement {
  const community = useSelector((state) => state.communities?.current);
  const path = useMemo(() => (community ? `/communities/${community.slug}` : ""), [community]);

  return community ? (
    <div data-testid="communityNavigationShow">
      <div className="relative flex items-center py-4 pt-4 text-sm border-b-2 md:pt-7 lg:border-0">
        <div className="leading-none text-gray-500" data-testid="communityNavLink">
          <Link href={path}>{community.name}</Link>
        </div>
        {paths?.map((path, index) => (
          <Fragment key={`path-${index}`}>
            <div className="px-0.5">
              <ChevronRightIcon viewBox="0 0 20 20" className="w-3 h-3" data-testid="communityNavId"/>
            </div>
            <div className="font-medium leading-none">{path}</div>
          </Fragment>
        ))}
      </div>
    </div>
  ) : (
    <></>
  );
}


