import { getMetadataDescription, getMetadataTitle } from "@/utilities/Metadata";
import { ReactElement, useMemo } from "react";
import { NextSeo } from "next-seo"


/**
 * Meta tags component
 * @date 4/27/2023 - 8:17:49 AM
 *
 * @export
 * @returns {ReactElement}
 */

interface MetadataProps {
  description?: string;
  title?: string | null;
  community?: string;
  testId?: string
}

export default function MetaData({ description, title, community, testId = "meta-id" }: MetadataProps): ReactElement {
  const metas = useMemo(() => getMetadataDescription(description), [description]);
  return (
    <>
      <NextSeo title={title || "dacade.org"} description={description || ""} />
      {title && <title data-testid="page-title">{getMetadataTitle(title, community as string)}</title>}
      {metas.map((meta, index) => (
        <meta data-testid={testId} key={`meta-${index}`} content={meta.content} name={meta.name} />
      ))}
    </>
  );
}
