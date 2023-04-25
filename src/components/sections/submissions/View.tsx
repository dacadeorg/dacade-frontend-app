import SubmissionViewCard from "@/components/cards/SubmissionView";
import Feedback from "@/components/sections/feedbacks";
import Evaluation from "./Evaluation";
import { ReactElement } from "react";

/**
 * SubmitionView Page
 * @date 4/25/2023 - 2:20:46 PM
 *
 * @export
 * @returns {*}
 */
export default function View():ReactElement {
  const submission: any = {};
  return submission ? (
    <div>
      <SubmissionViewCard submission={submission} />
      {submission.evaluation && <Evaluation />}
      <Feedback />
    </div>
  ) : (
    <></>
  );
}
