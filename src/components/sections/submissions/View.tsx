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

  if (!submission) return <></>;
  return (
    <>
      <SubmissionViewCard submission={submission} />
      {submission?.evaluation && <Evaluation />}
      <Feedback />
    </>
  );
}
