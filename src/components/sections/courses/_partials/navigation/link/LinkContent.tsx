import classNames from "classnames";
import React from "react";
import ChevronRightIcon from "@/icons/chevron-right.svg";
import { useTranslation } from "next-i18next";

interface LinkContentProps {
  isActive: boolean;
  expanded: boolean;
  item: any;
}

export default function LinkContent({
  isActive,
  expanded,
  item,
}: LinkContentProps) {
  const { t } = useTranslation();
  return (
    <span>
      {isActive && (
        <span className="absolute inline-block top-0 -left-6 nav-icon">
          <ChevronRightIcon
            className={classNames(
              {
                "transform rotate-90":
                  item.subitems &&
                  item.subitems.length &&
                  isActive &&
                  expanded,
              },
              "transition-transform duration-200"
            )}
          />
        </span>
      )}

      <span className="nav-label">{t(item.label)}</span>
    </span>
  );
}
