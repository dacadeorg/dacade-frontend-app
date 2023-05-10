import { useSelector } from "@/hooks/useTypedSelector";
import { NavItem as LinkContent } from "./Content";
import SubLink from "./Sub";
import { ActivableLink as LinkAction } from "./Action";
import { ReactElement, useMemo, useState } from "react";
import { useRouter } from "next/router";

/**
 * Course link props interface
 * @date 4/17/2023 - 1:00:05 PM
 *
 * @interface courseLinkProps
 * @typedef {courseLinkProps}
 */
interface courseLinkProps {
  item: {
    link: string;
    exact: boolean;
    subitems?: Array<{
      link: string;
      exact: boolean;
      label: string;
    }>;
    label: string;
  };
}

/**
 * Course link component
 * @date 4/17/2023 - 1:00:24 PM
 *
 * @export
 * @param {courseLinkProps} {
  item,
}
 * @returns {ReactElement}
 */
export default function CourseLink({ item }: courseLinkProps): ReactElement {
  const colors = useSelector((state) => state.ui.colors);
  const [expanded, setExpanded] = useState(true);

  const isCurrentLink = useMemo(
    () =>
      (link: string, exact: boolean = false) => {
        if (exact) {
          return window.location.pathname === link;
        }
        return window.location.pathname.includes(link);
      },
    []
  );

  const isActive = isCurrentLink(item.link, item.exact);

  const activeLinkStyle = {
    color: colors.primary,
  };

  const router = useRouter();

  const goToLink = () => {
    if (!item?.link) return;

    if (isCurrentLink(item.link, item.exact)) {
      setExpanded(!expanded);
      return;
    }
    router.push(item.link);
  };

  return (
    <span className="relative block text-sm">
      <LinkAction item={item} isActive={isActive} activeLinkStyle={activeLinkStyle} goToLink={goToLink}>
        <LinkContent item={item} isActive={isActive} expanded={expanded} />
      </LinkAction>
      {item.subitems && item.subitems.length ? (
        isCurrentLink(item.link, false) &&
        expanded && (
          <ul>
            {item.subitems.map((subitem, j) => (
              <SubLink key={`course-item-${j}`} item={item} subitem={subitem} activeLinkStyle={activeLinkStyle} />
            ))}
          </ul>
        )
      ) : (
        <></>
      )}
    </span>
  );
}
