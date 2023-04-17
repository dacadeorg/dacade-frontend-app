import { useSelector } from "@/hooks/useTypedSelector";
import React from "react";

interface DurationProps {
  duration: string;
  text: string;
  className?: string;
}
export default function Duration({
  duration,
  text,
  className,
}: DurationProps) {
  const colors = useSelector((state) => state.ui.colors);

  return duration ? (
    <div className={className}>
      <span className="text-sm text-gray-500">
        <span
          style={{
            color: colors.textAccent,
          }}
        >
          {duration}
        </span>
        {text}
      </span>
    </div>
  ) : null;
}
