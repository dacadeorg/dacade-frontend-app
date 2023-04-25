import SubmissionViewCard from "../cards/SubmissionView";
import Feedback from "../feedbacks";
import Evaluation from "./Evaluation";

/**
 * SubmitionView Page
 * @date 4/25/2023 - 2:20:46 PM
 *
 * @export
 * @returns {*}
 */
export default function View() {
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
