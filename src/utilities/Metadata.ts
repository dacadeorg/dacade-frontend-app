/**
 * Metadata description for the page
 * @date 3/22/2023 - 11:29:35 AM
 *
 * @typedef {MetadataDescription}
 */
type MetadataDescription = {
  hid?: string;
  name: string;
  content: string;
};

/**
 * Get metadata title from the arguments passed
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
 * Get metadata description from the description passed
 * @date 3/22/2023 - 10:03:55 AM
 *
 * @param {string} description
 * @returns {MetadataDescription[]}
 */

export const getMetadataDescription = (description?: string): MetadataDescription[] => {
  if (!description) return [];
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
