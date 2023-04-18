import Progress from "@/components/ui/Progress";
import H3 from "@/components/ui/text/H3";
import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement, ReactNode } from "react";

interface Props {
  title?: string;
  subtitle?: string;
  sectionTitle?: string;
  duration?: string;
  percentage?: number;
  children: ReactNode;
}

export default function InteractiveModuleWrapper({
  title = "",
  subtitle = "",
  sectionTitle = "",
  duration = "",
  percentage = 0,
  children,
}: Props): ReactElement {
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
            color: colors.textAccent,
          }}
        >
          {duration}
        </span>
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
