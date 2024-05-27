import SubmissionViewCard from "@/components/cards/SubmissionView";
import Feedback from "@/components/sections/feedbacks";
import Evaluation from "./Evaluation";
import { ReactElement } from "react";
import { useSelector } from "@/hooks/useTypedSelector";
import { useTranslation } from "react-i18next";

interface ViewProps {
  testId?: string;
}

/**
 * SubmitionView Page
 * @date 4/25/2023 - 2:20:46 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function View({ testId = "viewId" }: ViewProps): ReactElement {
  const submission = useSelector((state) => state.submissions.current);
    const { t } = useTranslation();
  return (
    <div data-testid={testId}>
      {submission ? (
        <>
          <SubmissionViewCard submission={submission} />
          {submission?.evaluation && <Evaluation />}
          <Feedback />
        </>
      ) : (
        <h1 className="text-lg font-medium text-gray-700 text-center">{t("communities.challenge.submission.no.feedbacks")}</h1>
      )}
    </div>
  );
}
