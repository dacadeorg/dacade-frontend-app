import { ReactElement, useState } from "react";
import ChevronTopIcon from "@/icons/chevron-top.svg";
import ChevronBottomIcon from "@/icons/chevron-bottom.svg";
import classNames from "classnames";
import DOMPurify from "dompurify";

/**
 * Details interface
 * @date 3/29/2023 - 1:41:57 PM
 *
 * @interface Details
 * @typedef {Details}
 */
interface Details {
  title: string;
  description: string;
}

/**
 * Interface for Question component card
 * @date 3/29/2023 - 1:42:44 PM
 *
 * @interface QuestionProps
 * @typedef {QuestionProps}
 */
interface QuestionProps {
  details: Details;
}

/**
 * Question card component
 * @date 3/29/2023 - 1:43:19 PM
 *
 * @export
 * @param {QuestionProps} {
  details,
}
 * @returns {ReactElement}
 */
export default function Question({
  details,
}: QuestionProps): ReactElement {
  const [show, setShow] = useState(false);

  const toggle = () => {
    setShow(!show);
  };

  /**
   * Sanitize html string passed into details.description 
   * @date 3/29/2023 - 2:18:59 PM
   *
   * @type {string}
   */
  const sanitazedDescription: string = DOMPurify.sanitize(
    details.description
  );

  const questionClassName = classNames(
    "flex justify-between space-x-5 align-middle hover:text-gray-900 font-medium cursor-pointer",
    { "text-gray-900 font-medium": show }
  );

  return (
    <div className="text-gray-500 text-base md:text-lg pt-4">
      <div className={questionClassName} onClick={toggle}>
        {details.title}
        {show && <ChevronTopIcon class="ml-4 mt-2" />}
        {!show && <ChevronBottomIcon class="ml-4 mt-2" />}
      </div>
      {show && (
        <div
          className="mt-3 text-gray-700 pr-5 prose"
          dangerouslySetInnerHTML={{ __html: sanitazedDescription }}
        />
      )}
    </div>
  );
}
