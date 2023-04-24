import { ReactElement, useState } from "react";
import Navigation from "./Navigation";
import { useTranslation } from "next-i18next";
import { useSelector } from "@/hooks/useTypedSelector";
import ChevronRightIcon from "@/icons/chevron-right.svg";
import ChevronBottomIcon from "@/icons/chevron-bottom.svg";

/**
 * MobileNav component interface
 * @date 4/18/2023 - 12:23:49 PM
 *
 * @interface MobileNavProps
 * @typedef {MobileNavProps}
 */
interface MobileNavProps {
  showTopBorder?: boolean;
}

/**
 * MobileNav component
 * @date 4/18/2023 - 12:23:58 PM
 *
 * @export
 * @param {MobileNavProps} { showTopBorder }
 * @returns {ReactElement}
 */
export default function MobileNav({
  showTopBorder,
}: MobileNavProps): ReactElement {
  const [visiblity, setvisiblity] = useState(false);

  const { t } = useTranslation();

  const colors = useSelector((state) => state.ui.colors);

  const activeLinkStyle = {
    color: colors.textAccent,
  };

  return (
    <div
      style={activeLinkStyle}
      className={`text-sm font-medium -mt-4 relative pt-4 py-4 md:py-7 border-b-2 border-t-2 ${
        !showTopBorder ? "border-t-2" : "-mt-10"
      }`}
    >
      <div className="flex">
        {visiblity ? (
          <div className="pr-1 mt-2">
            <ChevronBottomIcon />
          </div>
        ) : (
          <div>
            <ChevronRightIcon />
          </div>
        )}

        <p
          className="px-4"
          onClick={() => {
            setvisiblity(!visiblity);
          }}
        >
          {t("nav.mobile.pages")}
        </p>
      </div>
      {visiblity && (
        <div className="px-10 py-2 pb-0 -mb-2">
          <Navigation />
        </div>
      )}
    </div>
  );
}
