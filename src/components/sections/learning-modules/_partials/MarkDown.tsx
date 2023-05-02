import {
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import remarkGfm from "remark-gfm";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useRouter } from "next/router";
import { updateNavigationMarkdownMenu } from "@/store/feature/communities/navigation.slice";
import ReactMarkdown from "react-markdown";
import rehypeExternalLinks from "rehype-external-links";
import rehypeSlug from "rehype-slug";
import Loader from "@/components/ui/Loader";
import CodeHighlighter from "./CodeHighlighter";

/**
 * Markdown props interface
 * @date 4/19/2023 - 8:58:51 PM
 *
 * @interface MarkDownProps
 * @typedef {MarkDownProps}
 */
interface MarkDownProps {
  url: string;
}

/**
 * Markdown component
 * @date 4/19/2023 - 8:59:24 PM
 *
 * @export
 * @param {MarkDownProps} { url }
 * @returns {ReactElement}
 */
export default function Markdown({
  url,
}: MarkDownProps): ReactElement {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const colors = useSelector((state) => state.ui.colors);

  const themeStyles = {
    "--text-accent-color": colors.textAccent,
  };

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const responseText = await fetch(url).then((response) =>
        response.text()
      );

      setContent(responseText);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setContent(
          `<span style="color: red;">Error: ${error.message}</span>`
        );
      } else {
        setContent(
          `<span style="color: red;">An unknown error occurred</span>`
        );
      }
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    updateNavigationMarkdownMenu()(content, route, dispatch);
  }, [content, dispatch, route, url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading)
    return <Loader communityStyles={true} className="py-32" />;
  return (
    <div>
      {content && (
        <div
          style={{ ...(themeStyles as CSSProperties) }}
          className="prose"
        >
          <ReactMarkdown
            rehypePlugins={[rehypeExternalLinks, rehypeSlug]}
            remarkPlugins={[remarkGfm]}
            components={{
              code: ({ inline, className, children, ...props }) => {
                return (
                  <CodeHighlighter
                    inline={inline}
                    className={className}
                    {...props}
                  >
                    {children}
                  </CodeHighlighter>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
