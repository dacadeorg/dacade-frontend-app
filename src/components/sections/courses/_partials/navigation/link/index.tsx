import React, { useState } from "react";
import LinkAction from "./LinkAction";
import LinkContent from "./LinkContent";
import SubLink from "./SubLink";
import { useRouter } from "next/router";
import { useSelector } from "@/hooks/useTypedSelector";

interface LinkProps {
  item: any;
}

export default function Link({ item }: LinkProps) {
  const colors = useSelector((state) => state.ui.colors);
  const [expanded, setexpanded] = useState(true);
  const router = useRouter();

  const isCurrentLink = (link: string, exact = false) => {
    if (exact) {
      return router.asPath === link;
    }
    return router.asPath.includes(link);
  };

  const activeLinkStyle = { color: colors.primary };

  const isActive = isCurrentLink(item.link, item.exact);

  const goToLink = () => {
    if (!item?.link) return;

    if (isCurrentLink(item.link, item.exact)) {
      setexpanded(!expanded);
      return;
    }
    router.push(item.link);
  };
  return (
    <span className="relative block text-sm">
      <LinkAction
        item={item}
        isActive={isActive}
        activeLinkStyle={activeLinkStyle}
        goToLink={goToLink}
      >
        <LinkContent
          item={item}
          isActive={isActive}
          expanded={expanded}
        />
      </LinkAction>
      {item.subitems ? (
        item.subitems.length &&
        isCurrentLink(item.link, false) &&
        expanded ? (
          <ul>
            {item.subitems.map((subitem: any, j: number) => {
              return (
                <SubLink
                  key={j}
                  item={item}
                  subitem={subitem}
                  activeLinkStyle={activeLinkStyle}
                />
              );
            })}
          </ul>
        ) : null
      ) : null}
    </span>
  );
}
