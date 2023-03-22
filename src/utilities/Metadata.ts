type MetadataDescription = {
  hid?: string;
  /**
   * hid is used as unique identifier.
   * @date 3/22/2023 - 10:06:32 AM
   *
   * @type {string}
   */
  name: string;
  content: string;
};

/**
 * Get formated metadata title
 * @date 3/22/2023 - 10:03:55 AM
 *
 * @param {...string[]} args
 * @returns {string}
 */
export const getMetadataTitle = (...args: string[]): string => {
  const elements = args.filter((elements) => elements);
  if (!elements.length) return "Dacade";
  return `${elements.join(" - ")} | Dacade`;
};

/**
 * Get metadata description
 * @date 3/22/2023 - 10:03:55 AM
 *
 * @param {string} description
 * @returns {MetadataDescription[]} 
 */
export const getMetadataDescription = (
  description: string
): MetadataDescription[] => {
  if (!description) return [];
  // hid is used as unique identifier. Do not use `vmid` for it as it will not work
  return [
    {
      hid: "description",
      name: "description",
      content: description,
    },
    {
      name: "og:description",
      content: description,
    },
  ];
};
