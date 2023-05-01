import { ReactElement } from "react";

/**
 * Interface for the empty states props
 * @date 3/23/2023 - 11:44:34 AM
 *
 * @interface EmptyStateProps
 * @typedef {EmptyStateProps}
 */
interface EmptyStateProps {
  title?: string | null;
  subtitle?: string | null;
}

export default function EmptyState({
  title,
  subtitle,
}: EmptyStateProps): ReactElement {
  return (
    <div className="w-full text-center text-gray-500 py-20 text-base">
      {title && <h1 className="text-3xl mb-5">{title}</h1>}
      {subtitle && (
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      )}
    </div>
  );
}

