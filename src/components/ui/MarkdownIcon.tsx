import Image from "next/image";
import { ReactElement } from "react";
import markdown from "../../../public/assets/icons/markdown-fill.svg";

/**
 * Markdown Icon Component
 * @date 3/22/2023 - 2:16:01 PM
 *
 * @export
 * @returns {ReactElement}
 */

export default function MarkdownIcon(): ReactElement {
  return (
    <div className="mt-4 flex items-center">
      <span className="w-6 h-4">
        <Image src={markdown} alt="markdown icon" />
      </span>
      <span className="text-sm text-gray-500">
        <a
          href="https://www.markdownguide.org/cheat-sheet/"
          className="underline cursor-pointer"
          target="__blank"
        >
          Markdown
        </a>
        is supported
      </span>
    </div>
  );
}
