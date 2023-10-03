import { CSSProperties, ReactElement } from "react";
import remarkParse from "remark-parse";
import { useSelector } from "@/hooks/useTypedSelector";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import CodeHighlighter from "@/components/sections/learning-modules/_partials/CodeHighlighter";
import { PluggableList } from "react-markdown/lib/react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import rehypeRaw from "rehype-raw";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";
/**
 * Markdown props interface
 * @date 4/28/2023 - 5:58:38 PM
 *
 * @interface MarkDownProps
 * @typedef {MarkDownProps}
 */
interface MarkDownProps {
  value: string;
  markDownStyles?: string;
  translationBoxClass?: string;
}

/**
 * Markdown component
 * @date 4/28/2023 - 5:57:55 PM
 *
 * @export
 * @param {MarkDownProps} {
  value,
}
 * @returns {ReactElement}
 */
export default function Markdown({ value, markDownStyles, translationBoxClass }: MarkDownProps): ReactElement {
  const colors = useSelector((state) => state.ui.colors);
  const themeStyles = {
    "--text-accent-color": colors?.textAccent,
  };

  return (
    <div style={{ ...(themeStyles as CSSProperties) }} className={`prose ${markDownStyles} ${translationBoxClass}`}>
      <ReactMarkdown
        className="markdown-content"
        rehypePlugins={[rehypeExternalLinks, rehypeSlug, rehypeRaw, rehypeFormat, rehypeStringify]}
        remarkPlugins={[remarkGfm, remarkParse] as PluggableList}
        components={{
          code: ({ inline, className, children, ...props }) => {
            return (
              <CodeHighlighter inline={inline} className={className} {...props}>
                {children}
              </CodeHighlighter>
            );
          },
        }}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
}
