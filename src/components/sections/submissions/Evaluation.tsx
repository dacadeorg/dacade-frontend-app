import EvaluationCard from "@/components/cards/EvaluationCard";
import Coin from "@/components/ui/Coin";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import { Evaluation, Submission } from "@/types/bounty";
import { useTranslation } from "next-i18next";
import { ReactElement } from "react";
import RatingRubric from "../challenges/Rubric";
import { Colors } from "@/types/community";
import { Challenge } from "@/types/course";
import { IRootState } from "@/store";

interface EvaluationsProps {
  testId?: string;
}

/**
 * interface for Evaluations multiSelector
 * @date 9/13/2023 - 9:21:32 AM
 *
 * @interface EvaluationsMultiSelector
 * @typedef {EvaluationsMultiSelector}
 */
interface EvaluationsMultiSelector {
  colors: Colors;
  submission: Submission | null;
  challenge: Challenge | null;
}

/**
 * Evaluation Component
 * @date 4/25/2023 - 2:21:30 PM
 *
 * @export
 * @returns {ReactElement}
 */
export default function Evaluations({ testId = "evaluationsId" }: EvaluationsProps): ReactElement {
  const { t } = useTranslation();
  const { colors, submission, challenge } = useMultiSelector<unknown, EvaluationsMultiSelector>({
    colors: (state: IRootState) => state.ui.colors,
    submission: (state: IRootState) => state.submissions.current,
    challenge: (state: IRootState) => state.challenges.current,
  });
  const evaluation = submission?.evaluation as Evaluation;

  return (
    <div data-testid={testId}>
      <EvaluationCard evaluation={evaluation}>
        <>
          {challenge && <RatingRubric hideTitle ratingCriteria={challenge.ratingCriteria} selected={evaluation?.criteria} />}
          <div className="grid grid-cols-1 mt-3 space-y-4 md:space-y-0 md:grid-cols-2 lg:grid-cols-4 gap-y-5 gap-x-5">
            <div className="text-sm">
              <span className="block font-medium">{t("communities.challenge.evaluation.total")}</span>
              <span className="text-xl" style={{ color: colors?.textAccent }}>
                {evaluation?.points}
              </span>
              <span style={{ color: colors?.textAccent }}>
                /{evaluation?.totalPoints}
                {t("communities.challenge.evaluation.points")}
              </span>
            </div>
            {evaluation?.reward && (
              <div className="relative text-sm">
                {challenge?.isHackathon ? (
                  <>
                    <div>{t("communities.challenge.evaluation.message.nominated", { threshold: challenge.threshold })}</div>
                    <div className="inline-block font-medium" style={{ color: colors?.textAccent }}>
                      <span className="text-xl">{evaluation.reward.amount}</span> USD
                    </div>
                  </>
                ) : (
                  <>
                    <span className="block font-medium">{t("communities.challenge.evaluation.total")}</span>
                    <div className="absolute -left-5 top-7">
                      <Coin token={evaluation.reward.token} size="small" />
                    </div>
                    <div className="inline-block font-medium" style={{ color: colors?.textAccent }}>
                      <span className="text-xl">{evaluation.reward.amount}</span> <span>{evaluation.reward.token}</span>
                    </div>
                    <div>{t("communities.challenge.evaluation.message")}</div>
                  </>
                )}
              </div>
            )}
          </div>
        </>
      </EvaluationCard>
    </div>
  );
}
