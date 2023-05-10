import { ReactElement } from "react";

/**
 * AchievementViewItem component props
 * @date 5/3/2023 - 1:26:47 PM
 *
 * @interface AchievementViewItemProps
 * @typedef {AchievementViewItemProps}
 */
interface AchievementViewItemProps {
  name?: string;
  columns?: number;
  mobileBlock?: boolean;
  itemsStart?: boolean;
  children?: React.ReactNode;
}

/**
 * AchievementViewItem component
 * @date 5/3/2023 - 1:27:03 PM
 *
 * @export
 * @param {AchievementViewItemProps} {
  name,
  columns = 3,
  mobileBlock = false,
  itemsStart = false,
  children,
}
 * @returns {*}
 */
export default function AchievementViewItem({ name, columns = 3, mobileBlock = false, itemsStart = false, children }: AchievementViewItemProps): ReactElement {
  const gridClasses = !mobileBlock ? [`grid`, `grid-cols-${columns}`] : [`grid`, `grid-cols-1 md:grid-cols-${columns}`, `gap-y-3 md:gap-y-0`];

  const alignment = !itemsStart ? "items-center" : "items-start";

  return (
    <div className={["text-sm md:text-base", ...gridClasses, alignment].join(" ")}>
      <p className="font-medium justify-items-end leading-normal">{name}</p>
      <div className="text-gray-500 col-span-2 leading-normal">{children}</div>
    </div>
  );
}
