import { ReactNode, ReactElement } from "react";

/**
 * Interface for profile overview section
 * @date 5/3/2023 - 10:36:37 AM
 *
 * @interface ProfileOverviewSectionProps
 * @typedef {ProfileOverviewSectionProps}
 */
interface ProfileOverviewSectionProps {
  title: string;
  children: ReactNode;
}

/**
 * Profile overview wrapper sections
 * @date 5/3/2023 - 10:37:02 AM
 *
 * @export
 * @param {ProfileOverviewSectionProps} {
  title,
  children,
}
 * @returns {ReactElement}
 */
export default function ProfileOverviewSection({
  title,
  children,
}: ProfileOverviewSectionProps): ReactElement {
  return (
    <div className="py-5.5">
      <div className="flex items-center">
        <h6 className="pb-5 text-xs font-semibold leading-relaxed text-gray-500 uppercase">
          {title}
        </h6>
      </div>
      {children}
    </div>
  );
}
