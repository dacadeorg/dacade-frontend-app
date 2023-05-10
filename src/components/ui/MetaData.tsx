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
    <>
      {metas.map((meta, index) => (
        <meta key={`meta-${index}`} content={meta.content} name={meta.name} />
      ))}
    </>
  );
}
