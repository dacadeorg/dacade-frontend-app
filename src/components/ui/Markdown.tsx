/**
 * Some lines in this file are temporary commented
 * because redux and its features are not implemented yet.
 */

import { useState, useEffect, ReactElement, useCallback, HTMLProps } from "react";

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
import rehypeFormat from "rehype-format";

interface MarkdownProps extends HTMLProps<HTMLDivElement> {
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

export default function Markdown({ value, ...props }: MarkdownProps): ReactElement {
  const [content, setContent] = useState("");

  //TODO: Should be uncommented when redux will be implemented
  //   const colors = useSelector((state: any) => state.ui.colors);
  //   const community = useSelector((state: any) => state.communities.current);

  /**
   * Parse the markdown content with the below plugins:
   *  - remarkParse: parses Markdown content into an abstract syntax tree (AST).
   *  - remarkBreaks: converts single line breaks in the Markdown into <br> tags.
   *  - remarkGfm: adds support for GitHub Flavored Markdown extensions.
   *  - Highlighter: highlights code blocks in the Markdown.
   *  - remarkRehype: converts the Markdown AST into a rehype AST (for HTML generation).
   *  - rehypRaw: which preserves raw HTML elements in the HTML output.
   *  - rehypeExternalLinks: adds target="_blank" to external links in the HTML.
   *  - rehypeSlug: adds anchor IDs to heading elements in the HTML.
   *  - rehypeStringify: converts the rehype AST into HTML string format.
   *
   * @date 3/23/2023 - 12:42:38 PM
   *
   */
  const parseMarkdown = useCallback(async (content: string) => {
    unified()
      .use(remarkParse)
      .use(remarkBreaks)
      .use(remarkGfm)
      .use(() => Highlighter)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeRaw)
      .use(rehypeExternalLinks, { target: "_blank" })
      .use(rehypeSlug)
      .use(rehypeStringify)
      .use(rehypeFormat)
      .use(rehypeStringify)
      .process(content, (error, file) => {
        if (!error) setContent(file?.value as string);
      });
  }, []);

  useEffect(() => {
    parseMarkdown(value);
  }, [parseMarkdown, value]);

  // TODO: Should be uncommented when redux will be implemented
  //   const themeStyles = {
  //     "--text-accent-color": colors.textAccent,
  //   };

  return (
    <div
      // TODO: Should be uncommented when redux will be implemented
      //  style={themeStyles}
      {...props}
      className="prose"
      data-testid="markdown"
    >
      <div className="markdown-content" dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
}
