import { useTranslation } from "next-i18next";
import React, { Fragment } from "react";
import EvaluationCard from "@/components/cards/Evaluation";
import Coin from "@/components/ui/Coin";
import { useSelector } from "@/hooks/useTypedSelector";
import RatingRubric from "@/components/sections/challenges/Rubric";

/**
 * Evaluation Component
 * @date 4/25/2023 - 2:21:30 PM
 *
 * @export
 * @returns {*}
 */
export default function Evaluation() {
  const { t } = useTranslation();
  const colors = useSelector((state) => state.ui.colors);

  const submission: any = {};

  const evaluation: any = submission.evaluation;
  return (
    <EvaluationCard evaluation={evaluation}>
      <Fragment>
        {submission.challenge && (
          <RatingRubric
            hideTitle
            ratingCriteria={submission.challenge.ratingCriteria}
            selected={evaluation.criteria}
          />
        )}
        <div className="grid grid-cols-1 space-y-4 md:space-y-0 md:grid-cols-2 lg:grid-cols-4 mt-3 gap-y-5 gap-x-5">
          <div className="text-sm">
            <span className="block font-medium">
              {t("communities.challenge.evaluation.total")}
            </span>
            <span
              className="text-xl"
              style={{
                color: colors.textAccent,
              }}
            >
              {evaluation.points}
            </span>
            <span
              style={{
                color: colors.textAccent,
              }}
            >
              /{evaluation.totalPoints}
              {t("communities.challenge.evaluation.points")}
            </span>
          </div>
          <div v-if="evaluation.reward" className="text-sm relative">
            <span className="block font-medium">
              {t("communities.challenge.evaluation.total")}
            </span>
            <div className="absolute -left-5 top-7">
              <Coin token={evaluation.reward.token} size="small" />
            </div>
            <div
              className="inline-block font-medium"
              style={{
                color: colors.textAccent,
              }}
            >
              <span className="text-xl">
                {evaluation.reward.amount}
              </span>
              <span>{evaluation.reward.token}</span>
            </div>
            <div>{t("communities.challenge.evaluation.message")}</div>
          </div>
        </div>
      </Fragment>
    </EvaluationCard>
  );
}
