export enum MaterialType {
  ADDITIONAL = "ADDITIONAL",
  MARKDOWN = "MARKDOWN",
  TEXT = "TEXT",
  ARTICLE = "ARTICLE",
  "EMBEDDED-VIDEO" = "EMBEDDED-VIDEO",
}

export type Material = {
  duration: number;
  subtitle?: string;
  link: string;
  description?: string;
  title: string;
  type: MaterialType;
  list: { link: string }[];
};
