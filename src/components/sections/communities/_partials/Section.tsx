import { ReactElement, ReactNode } from "react";
import H3 from "@/components/ui/text/H3";

/**
 * Section props interface
 * @date 4/12/2023 - 5:17:58 PM
 *
 * @interface SectionProps
 * @typedef {SectionProps}
 */
interface SectionProps {
  title?: string | null;
  titleBold?: boolean;
  subtitle?: string | null;
  id?: string;
  className?: string;
  hideSubtitleOnMobile?: boolean;
  children?: ReactNode;
}

/**
 * Section Component
 * @date 4/12/2023 - 5:18:41 PM
 *
 * @export
 * @param {SectionProps} {
  title,
  titleBold = true,
  subtitle,
  id,
  hideSubtitleOnMobile = false,
  children,
}
 * @returns {ReactElement}
 */
export default function Section({ title, titleBold = true, subtitle, id, hideSubtitleOnMobile = false, children, className = "" }: SectionProps): ReactElement {
  return (
    <div id={id} className={`text-xl md:text-.5xl px-0 py-6 ${className}`}>
      {title && <H3 bold={titleBold}>{title}</H3>}
      <p className={`text-base md:text-.5xl font-normal leading-normal text-primary ${hideSubtitleOnMobile ? "hidden" : ""}`}>{subtitle}</p>
      <div>{children}</div>
    </div>
  );
}
