import {
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";
import remarkUnwrapAllImages from "remark-unwrap-all-images";
import rehypeSlug from "rehype-slug";
import Slugger from "github-slugger";
import Highlighter from "@/utilities/Highlighter";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeFormat from "rehype-format";
import withToc from "@stefanprobst/remark-extract-toc";
import { cloneDeep } from "lodash";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useRouter } from "next/router";
import { Compatible } from "vfile";
import { setNavigationList } from "@/store/feature/communities/navigation.slice";

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
  const [markdown, setMarkdown] = useState<{ [key: string]: any }>();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const colors = useSelector((state) => state.ui.colors);
  const menus = useSelector((state) => state.navigation.list);

  const themeStyles = {
    "--text-accent-color": colors.textAccent,
  };

  const handleNavigation = useCallback(
    (markdown: Compatible | undefined) => {
      const processor = unified().use(remarkParse).use(withToc);
      const node = processor.parse(markdown);
      // Casting with any because processor.runSync has not arrays methods type infered.
      const tree = processor.runSync(node) as any;
      const data = cloneDeep(menus);
      const slugger = new Slugger();
      const list = data.map((menu) => {
        if (menu.id !== "learning-modules") {
          return menu;
        }
        menu.items = menu.items.map((item) => {
          if (item.id !== route.query.id) {
            return item;
          }
          slugger.reset();
          item.subitems = tree.map((el: { value: string }) => {
            return {
              label: String(el.value).replace(/^\d+\.+\d\s*/, ""),
              link: `${slugger.slug(el.value)}`,
              exact: false,
            };
          });
          return item;
        });
        return menu;
      });

      dispatch(setNavigationList(list));
    },
    [dispatch, menus, route.query.id]
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const responseText = await fetch(url).then((response) =>
          response.text()
        );
        const { data } = matter(responseText);
        setMarkdown(data);
        handleNavigation(markdown);

        unified()
          .use(remarkParse)
          .use(remarkBreaks)
          .use(remarkGfm)
          .use(() => Highlighter)
          .use(remarkRehype, { allowDangerousHtml: true })
          .use(remarkUnwrapAllImages)
          .use(rehypeRaw)
          .use(rehypeExternalLinks, { target: "_blank" })
          .use(rehypeSlug)
          .use(rehypeStringify)
          .use(rehypeFormat)
          .use(rehypeStringify)
          .process(content, (error, file) => {
            if (!error) setContent(file?.value as string);
          });
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
    };
    fetchData();
  }, [content, handleNavigation, markdown, markdown?.content, url]);

  return (
    <div>
      {!loading ? (
        <div>
          {markdown && (
            <div
              style={{ ...(themeStyles as CSSProperties) }}
              className="prose"
            >
              {markdown.title && <h2>{markdown.title}</h2>}
              <div
                className="markdown-content"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
