import Progress from "@/components/ui/Progress";
import H3 from "@/components/ui/text/H3";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement, ReactNode } from "react";

/**
 * interactive Module Wrapper Props interface
 * @date 4/19/2023 - 1:41:31 PM
 *
 * @interface interactiveModuleWrapperProps
 * @typedef {interactiveModuleWrapperProps}
 */
interface interactiveModuleWrapperProps {
  title?: string;
  subtitle?: string;
  sectionTitle?: string;
  duration?: string;
  percentage?: number;
  children: ReactNode;
}

/**
 * interactive Module Wrapper component
 * @date 4/19/2023 - 1:41:56 PM
 *
 * @export
 * @param {interactiveModuleWrapperProps} {
  title = "",
  subtitle = "",
  sectionTitle = "",
  duration = "",
  percentage = 0,
  children,
}
 * @returns {ReactElement}
 */
export default function InteractiveModuleWrapper({
  title = "",
  subtitle = "",
  sectionTitle = "",
  duration = "",
  percentage = 0,
  children,
}: interactiveModuleWrapperProps): ReactElement {
  const colors = useSelector((state) => state.ui.colors);

  return (
    <div
      className="pt-14"
      style={{
        maxWidth: "65ch",
      }}
    >
      <H3>{sectionTitle}</H3>
      <p className="text-sm pb-3 pt-1">
        <span
          style={{
            color: colors?.textAccent,
          }}
        >
          {duration}
        </span>{" "}
        Interactive lessons
      </p>
      <Progress percentage={percentage} communityStyles />
      <div className="pt-9">
        <H3>{title}</H3>
        <span className="pt-1 text-gray-500 text-sm">{subtitle}</span>
      </div>
      <div className="revolution">{children}</div>
    </div>
  );
}
