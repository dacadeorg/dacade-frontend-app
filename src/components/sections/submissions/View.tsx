import SubmissionViewCard from "@/components/cards/SubmissionView";
import Feedback from "@/components/sections/feedbacks";
import Evaluation from "./Evaluation";
import { ReactElement } from "react";
import { useSelector } from "@/hooks/useTypedSelector";

/**
 * SubmitionView Page
 * @date 4/25/2023 - 2:20:46 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function View(): ReactElement {
  const submission = useSelector((state) => state.submissions.current);
  return submission ? (
    <>
      <SubmissionViewCard submission={submission} />
      <Evaluation />
      <Feedback />
    </>
  ) : (
    <h1 className="text-lg font-medium text-gray-700 text-center">The feedback for this submission is no longer available</h1>
  );
}
