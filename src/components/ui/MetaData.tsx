import { getMetadataDescription } from "@/utilities/Metadata";
import { ReactElement } from "react";

/**
 * Meta tags component
 * @date 4/27/2023 - 8:17:49 AM
 *
 * @export
 * @returns {ReactElement}
 */
export default function MetaData({ description }: { description: string }): ReactElement {
  const metas = getMetadataDescription(description);
  return (
    <div data-testid="meta-id">
      {metas.map((meta, index) => (
        <meta data-testid={`meta-${index}`} key={`meta-${index}`} content={meta.content} name={meta.name} />
      ))}
    </div>
  );
}
