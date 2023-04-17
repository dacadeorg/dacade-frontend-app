import { useSelector } from "@/hooks/useTypedSelector";
import React from "react";

export default function Description() {
  const htmlTagsCleanup = (value: string) => {
    return value.replace(
      /<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&gt;/g,
      ""
    );
  };

  const course = useSelector((state) => state.courses.current);

  return course ? (
    <div className="text-lg px-0 pt-9 py-2 md:hidden leading-snug tracking-onepercent pb-8 mb-0 border-b-2 md:border-b-0">
      {htmlTagsCleanup(course.description || course.summary || "")}
    </div>
  ) : null;
}
