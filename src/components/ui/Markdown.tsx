/**
 * Some lines in this file are temporary commented
 * because redux and its features are not implemented yet.
 */

import { useState, useEffect, ReactElement } from "react";

// TODO: Should be uncommented when redux will be implemented
// import { useSelector } from "react-redux";
import { unified } from "unified";
import remarkParse from "remark-parse";
import rehypeRaw from "rehype-raw";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import Highlighter from "@/utilities/Highlighter";

interface MarkdownProps {
  value: string;
}

/**
 * Markdown Component
 * @date 3/22/2023 - 3:08:37 PM
 *
 * @export
 * @param {MarkdownProps} { value }
 * @returns {ReactElement}
 */

export default function Markdown({ value }: MarkdownProps): ReactElement {
  const [content, setContent] = useState("");

  //TODO: Should be uncommented when redux will be implemented
  //   const colors = useSelector((state: any) => state.ui.colors);
  //   const community = useSelector((state: any) => state.communities.current);

  useEffect(() => {
    (async (content: string) => {
      const { value } = await unified()
        .use(remarkParse)
        .use(remarkBreaks)
        .use(remarkGfm)
        .use(() => Highlighter)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeRaw)
        .use(rehypeExternalLinks, { target: "_blank" })
        .use(rehypeSlug)
        .use(rehypeStringify)
        .process(content);
      setContent(value as string);
    })(value);
  }, [value]);

  // TODO: Should be uncommented when redux will be implemented
  //   const themeStyles = {
  //     "--text-accent-color": colors.textAccent,
  //   };

  return (
    <div
      // TODO: Should be uncommented when redux will be implemented
      //  style={themeStyles}
      className="prose"
      data-testid="markdown"
    >
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
