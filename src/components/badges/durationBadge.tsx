import DateManager from "@/utilities/DateManager";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

interface DurationBadgeProps {
  value: number;
  type?: string;
}

export default function DurationBadge({ value, type = "gray" }: DurationBadgeProps) {
  const router = useRouter();
  const duration = useMemo(() => {
    return (value: number) => {
      if (!value) {
        return 0;
      }
      return DateManager.humanize(value, router.locale as string);
    };
  }, [router.locale]);
  return (
    <div
      className={classNames("text-xxs uppercase font-semibold px-2 rounded-3xl inline-block text-gray-500 text-nowrap", {
        "bg-gray-200": type === "gray",
        "border border-gray-200": type === "bordered",
      })}
    >
      {duration(value)}
    </div>
  );
}
