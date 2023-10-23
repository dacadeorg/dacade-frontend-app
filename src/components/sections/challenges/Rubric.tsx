import Section from "@/components/sections/communities/_partials/Section";
import { useMultiSelector } from "@/hooks/useTypedSelector";
import Checkmark from "@/icons/checkmark.svg";
import { Challenge, Rubric } from "@/types/course";
import { RatingCriteria } from "@/types/course";
import { useTranslation } from "next-i18next";
import { Fragment, ReactElement } from "react";
import Accordion from "@/components/ui/accordion/Accordion";
import { IRootState } from "@/store";
import { Colors } from "@/types/community";
import Coin from "@/components/ui/Coin";

/**
 * Rubic header component props interface
 * @date 4/18/2023 - 4:00:52 PM
 *
 * @interface RubricHeaderProps
 * @typedef {RubricHeaderProps}
 */
interface RubricHeaderProps {
  ratingCriteria: RatingCriteria[];
  selected: Rubric[];
  hideTitle?: boolean;
}

/**
 * Rubic Header components
 * @date 4/18/2023 - 4:00:38 PM
 *
 * @export
 * @param {RubricHeaderProps} {
  ratingCriteria,
  selected,
  hideTitle = false,
}
 * @returns {ReactElement}
 */
export default function RubricHeader({ ratingCriteria, selected, hideTitle = false }: RubricHeaderProps): ReactElement {
  const { t } = useTranslation();
  const { challenge, colors } = useMultiSelector<unknown, { challenge: Challenge; colors: Colors }>({
    challenge: (state: IRootState) => state.challenges.current,
    colors: (state: IRootState) => state.ui.colors,
  });
  const selectedRubric = (id: string) => selected?.find((rubric) => rubric.id === id);
  const reward = challenge?.rewards?.find((reward) => reward.type === "SUBMISSION");

  const translatedPassingScore = () => {
    const passingScore = t("communities.challenge.passing.score.description", {
      amount: reward?.amount,
      token: reward?.token,
      minPoints: challenge?.minPoints,
      maxPoints: challenge?.maxPoints,
    });
    const coinPlaceholder = "{{coinPlaceholder}}";
    const passingScoreParts = passingScore.split(coinPlaceholder);

    return (
      <>
        <div className="text-base font-normal text-slate-700 pt-8 md:w-99 inline-flex flex-wrap items-center gap-1">
          {passingScoreParts.map((part, index) => {
            if (index === passingScoreParts.length - 1) {
              return part.split(" ").map((word, index) => <span key={index} dangerouslySetInnerHTML={{ __html: word }} />);
            } else {
              return (
                <Fragment key={index}>
                  {part.split(" ").map((word, index) => (
                    <span key={index} dangerouslySetInnerHTML={{ __html: word }} />
                  ))}
                  {<Coin token={reward?.token} size="small" className="!-mr-1 md:!-mr-1 -ml-1" />}
                </Fragment>
              );
            }
          })}
        </div>
      </>
    );
  };

  return (
    <Section>
      <Accordion
        title={!hideTitle ? (t("communities.challenge.criteria.title") as string) : ""}
        isExpanded
        content={
          <>
            {translatedPassingScore()}
            <div>
              {ratingCriteria.map((criteria, i) => (
                <div key={`rating-criteria-item-${i}`} className="mt-8">
                  <span className="block text-sm capitalize font-medium">{criteria.name}</span>
                  <div className="grid grid-cols-1 sm:space-y-4 space-y-0 md:space-y-0 md:grid-cols-2 lg:grid-cols-4 mt-3 sm:gap-y-5 gap-y-2 gap-x-3">
                    {criteria.rubric.map((rubric, k) => (
                      <div
                        key={`criteria-rubic-item-${k}`}
                        className={`text-sm border border-transparent sm:border-gray-200 px-0 py-2 sm:p-3.5 rounded-2xl ${
                          selected?.length && !selectedRubric(rubric.id) ? "opacity-40" : "relative"
                        }`}
                      >
                        {selectedRubric(rubric.id) && (
                          <span className="absolute -left-6 top-1 w-3" style={{ color: colors?.textAccent }}>
                            <Checkmark />
                          </span>
                        )}
                        <span className="block mb-1.5 font-bold leading-normal" style={{ color: colors?.textAccent }}>
                          <span className="mr-1">{selectedRubric(rubric.id) ? selectedRubric(rubric.id)?.points : rubric.points}</span>
                          {t("communities.challenge.criteria.points")}
                        </span>
                        <span className="block leading-normal">{rubric.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </>
        }
      />
    </Section>
  );
}
