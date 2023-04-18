import { CSSProperties, useEffect, useState } from "react";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeExternalLinks from "rehype-external-links";
import rehypeStringify from "rehype-stringify";
import remarkUnwrapAllImages from "remark-unwrap-all-images";
import ExtractToc from "remark-extract-toc";
import rehypeSlug from "rehype-slug";
import Slugger from "github-slugger";
import Highlighter from "@/utilities/Highlighter";
import Loader from "@/components/ui/Loader";
import { cloneDeep } from "lodash";
import { useSelector } from "@/hooks/useTypedSelector";
import { useDispatch } from "@/hooks/useTypedDispatch";
import { useRouter } from "next/router";

const Markdown = ({ url }: { url: string }) => {
  const dispatch = useDispatch();
  const [markdown, setMarkdown] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRouter()
  const colors = useSelector((state) => state.ui.colors);
  const community = useSelector((state) => state.communities.current);
  const menus = useSelector(
    (state) => state.communities.navigation.list
  );

  const themeStyles = {
    "--text-accent-color": colors.textAccent,
  };

  const handleNavigation = (markdown) => {
    const processor = unified().use(remarkParse).use(ExtractToc);
    const node = processor.parse(markdown);
    const tree = processor.runSync(node);
    const data = cloneDeep(menus);
    const slugger = new Slugger();
    const list = data.map((menu: { id: string; items: any[] }) => {
      if (menu.id !== "learning-modules") {
        return menu;
      }
      menu.items = menu.items.map((item) => {
        if (item.id !== route.query.id) {
          return item;
        }
        slugger.reset();
        item.subitems = tree.map((el) => {
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

    dispatch({
      type: "communities/navigation/setList",
      payload: list,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const content = await fetch(url).then((response) =>
          response.text()
        );
        setMarkdown(matter(content));

        handleNavigation(markdown?.content);

        const { value } = await unified()
          .use(remarkUnwrapAllImages)
          .use(remarkParse)
          .use(Highlighter)
          .use(remarkRehype)
          .use(rehypeExternalLinks)
          .use(rehypeSlug)
          .use(rehypeStringify)
          .process(markdown.content);
        setContent(value);
      } catch (e) {
        console.log(e.message);
        setContent(
          `<span style="color: red;">Error: ${e.message}</span>`
        );
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {!loading ? (
        <div>
          {markdown && (
            <div
              style={{ ...(themeStyles as CSSProperties) }}
              className="prose"
            >
              {markdown.data.title && <h2>{markdown.data.title}</h2>}
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
};
