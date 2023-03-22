import { ReactElement } from "react";

type EmptyStateProps = {
  title?: string;
  subtitle?: string;
}

function EmptyState({ title, subtitle }: EmptyStateProps): ReactElement {
  return (
    <div className="w-full text-center text-gray-500 py-20 text-base">
      {title && <h1 className="text-3xl mb-5">{title}</h1>}
      {subtitle && <p className="test-sm" dangerouslySetInnerHTML={{ __html: subtitle }} />}
    </div>
  );
};

export default EmptyState;