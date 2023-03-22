import lowlight from "lowlight/lib/core";
import visit from "unist-util-visit";
import { Data, Node } from "unist";

// TODO: Type and desctiption should be updated after getting much explaination about this utility function

type AttacherArgs = {
  include?: string[];
  exclude?: string[];
  prefix?: string;
};

/**
 * Description placeholder
 * @date 3/22/2023 - 10:46:46 AM
 *
 * @export
 * @param {AttacherArgs} { include, exclude, prefix }
 * @returns {(ast: any) => any}
 */

export default function attacher({
  include,
  exclude,
  prefix,
}: AttacherArgs): (ast: any) => any {
  // register custom languages

  lowlight.registerLanguage(
    "solidity",
    require("highlightjs-solidity").definer
  );
  lowlight.registerLanguage("xml", require("highlight.js/lib/languages/xml"));
  lowlight.registerLanguage("css", require("highlight.js/lib/languages/css"));
  lowlight.registerLanguage("toml", require("highlight.js/lib/languages/ini"));
  lowlight.registerLanguage("rust", require("highlight.js/lib/languages/rust"));
  lowlight.registerLanguage("bash", require("highlight.js/lib/languages/bash"));
  lowlight.registerLanguage(
    "python",
    require("highlight.js/lib/languages/python")
  );
  lowlight.registerLanguage(
    "javascript",
    require("highlight.js/lib/languages/javascript")
  );
  lowlight.registerLanguage("json", require("highlight.js/lib/languages/json"));

  /**
   * Description placeholder
   * @date 3/22/2023 - 10:47:26 AM
   *
   * @param {{ data?: any; value?: any; lang?: any }} node
   */

  function visitor(node: { data?: any; value?: any; lang?: any }) {
    const { lang } = node;
    let { data } = node;

    if (
      !lang ||
      (include && !include.includes(lang)) ||
      (exclude && exclude.includes(lang))
    ) {
      return;
    }

    if (!data) {
      data = {};
      node.data = data;
    }

    if (!data.hProperties) {
      data.hProperties = {};
    }

    data.hChildren = lowlight.highlight(lang, node.value, { prefix }).value;
    data.hProperties.className = [
      "hljs",
      ...(data.hProperties.className || []),
      "language-" + lang,
    ];
  }

  return (ast: Node<Data>) => visit(ast, "code", visitor);
}
