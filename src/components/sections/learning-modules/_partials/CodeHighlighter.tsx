import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import darcula from "react-syntax-highlighter/dist/cjs/styles/prism/darcula";
import { ReactElement } from "react";
import { CodeProps } from "react-markdown/lib/ast-to-react";

/**
 * CodeHighlighter component responsible for highlighting code in the mardown
 * @date 4/24/2023 - 9:17:47 PM
 *
 * @export
 * @param {CodeProps} {
  inline,
  children,
  className,
  props,
}
 * @returns {ReactElement}
 */

export default function CodeHighlighter({
  inline,
  className,
  children,
  ...props
}: CodeProps): ReactElement {
  const match = /language-(\w+)/.exec(className || "");

  if (!inline && match)
    return (
      <SyntaxHighlighter
        {...props}
        showLineNumbers={true}
        language={match[1]}
        PreTag="div"
        style={darcula}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  return <code>{children}</code>;
}
