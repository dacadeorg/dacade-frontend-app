import DateManager from "@/utilities/DateManager";
import classNames from "classnames";
import { useRouter } from "next/router";
import React, { useMemo } from "react";

export default function DurationBadge({ value, type = "gray" }: { value: number; type?: string }) {
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
    <span
      className={classNames("text-xxs uppercase font-semibold px-2 rounded-3xl inline-block text-gray-500", {
        "bg-gray-200": type === "gray",
        "border border-gray-200": type === "bordered",
      })}
    >
      {duration(value)}
    </span>
  );
}
