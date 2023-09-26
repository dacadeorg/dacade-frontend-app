import { useSelector } from "@/hooks/useTypedSelector";
import { ReactElement } from "react";

/**
 * Description component
 * @date 4/18/2023 - 12:24:23 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Description(): ReactElement {
  const htmlTagsCleanup = (value: string) => {
    return value.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g, "");
  };

  const course = useSelector((state) => state.courses.current);

  return course ? (
    <div className="px-0 py-2 pb-8 mb-0 text-lg leading-snug border-b-2 pt-9 md:hidden tracking-onepercent md:border-b-0">
      {htmlTagsCleanup(course.description || course.summary || "")}
    </div>
  ) : (
    <></>
  );
}
