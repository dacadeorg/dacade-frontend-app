import React from "react";

interface Props {
  name?: string;
  columns?: number;
  mobileBlock?: boolean;
  itemsStart?: boolean;
  children?: React.ReactNode;
}

export default function AchievementViewItem({
  name,
  columns = 3,
  mobileBlock = false,
  itemsStart = false,
  children,
}: Props) {
  const gridClasses = !mobileBlock
    ? [`grid`, `grid-cols-${columns}`]
    : [
        `grid`,
        `grid-cols-1 md:grid-cols-${columns}`,
        `gap-y-3 md:gap-y-0`,
      ];

  const alignment = !itemsStart ? "items-center" : "items-start";

  return (
    <div
      className={[
        "text-sm md:text-base",
        ...gridClasses,
        alignment,
      ].join(" ")}
    >
      <p className="font-medium justify-items-end leading-normal">
        {name}
      </p>
      <div className="text-gray-500 col-span-2 leading-normal">
        {children}
      </div>
    </div>
  );
}
