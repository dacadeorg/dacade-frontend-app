import { ReactElement, ReactNode } from "react";
import H3 from "@/components/ui/text/H3";

/**
 * OverviewRewards props interface
 * @date 4/12/2023 - 5:17:58 PM
 *
 * @interface OverviewRewardsProps
 * @typedef {OverviewRewardsProps}
 */
interface OverviewRewardsProps {
  title?: string;
  titleBold?: boolean;
  subtitle?: string;
  id?: string;
  hideSubtitleOnMobile?: boolean;
  children: ReactNode;
}

/**
 * OverviewRewards Component
 * @date 4/12/2023 - 5:18:41 PM
 *
 * @export
 * @param {OverviewRewardsProps} {
  title,
  titleBold = true,
  subtitle,
  id,
  hideSubtitleOnMobile = false,
  children,
}
 * @returns {ReactElement}
 */
export default function OverviewRewards({
  title,
  titleBold = true,
  subtitle,
  id,
  hideSubtitleOnMobile = false,
  children,
}: OverviewRewardsProps): ReactElement {
  return (
    <div
      id={id}
      className="text-xl md:text-.5xl px-0 py-5 md:py-10 md:pb-5"
    >
      {title && <H3 bold={titleBold}>{title}</H3>}
      <p
        className={`text-base md:text-.5xl font-normal leading-normal ${
          hideSubtitleOnMobile ? "hidden" : ""
        }`}
      >
        {subtitle}
      </p>
      <div>{children}</div>
    </div>
  );
}
