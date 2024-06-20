import { getMetadataDescription } from "@/utilities/Metadata";
import { ReactElement, useMemo } from "react";

/**
 * Meta tags component
 * @date 4/27/2023 - 8:17:49 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function MetaData({ description, testId = "meta-id" }: { description?: string; testId?: string }): ReactElement {
  const metas = useMemo(() => getMetadataDescription(description), [description]);
  return (
    <>
      {metas.map((meta, index) => (
        <meta data-testid={testId} key={`meta-${index}`} content={meta.content} name={meta.name} />
      ))}
    </>
  );
}
