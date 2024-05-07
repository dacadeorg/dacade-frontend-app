import { ReactElement, useMemo } from "react";

interface NoHtmlProps {
  value: string;
  testId?: string;
}

export default function NoHtml({ value, testId = "processed" }: NoHtmlProps): ReactElement {
  const processedString = useMemo(() => value.replace(/(<([^>]+)>)/gi, ""), [value]);

  return <span data-testid={testId}>{processedString}</span>;
}
